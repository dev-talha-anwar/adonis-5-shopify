// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Config from '@ioc:Adonis/Core/Config'
import User from "App/Models/User";
import Common from 'App/Helpers/CommonHelper'
import Shopify from 'App/Helpers/Shopify/ShopifyHelper'
const queryString = require('query-string');
const crypto = require('crypto');
import AfterAuthenticateJob from 'App/Jobs/Producers/AfterAuthenticateJob'
import Queue from '@ioc:Adonis5/Queue'

class AuthHelper {

    public async auth({ request, view }) {
        const { shop } = request.get()
        const usersShopifyUrl = this.makeShopUrl(shop)
        const authUrl = this.makeLoginUrl(usersShopifyUrl)
        return view.render('auth.partials.redirect', { url: authUrl })
    }

    public async loginRedirectCallback({ request, session, response, auth }) {
        const { shop, hmac, code } = request.get()
        if (shop && hmac && code) {
            let hashEquals = this.verifyHmac(request)
            if (!hashEquals) {
                return response.status(400).send('HMAC validation failed')
            }
            const res = await Common.http(this.makeTokenUrl(shop), 'post', this.makeTokenData(code));
            var token = res.data.access_token
            const shopApiData = await Shopify.shopApi({ fields: 'email' }, token, shop)
            session.put('shopify_user_session', token)
            const searchPayload = { email: shopApiData.email, name: shop }
            const user = await User.query().where({ email: shopApiData.email, name: shop }).first()
            if (!user) {
                await Shopify.createDefaultData(shop, token)
            }
            const savePayload = { password: token, name: shop, token: token }
            await User.updateOrCreate(searchPayload, savePayload)
            const shops = await User.findBy('name', shop)
            if (shops?.token === token) {
                await auth.login(shops!)
                Queue.dispatch(new AfterAuthenticateJob({ shop: shop, token: token }))
                response.redirect(Route.makeUrl('home'))
            } else {
                const shop = await User.findOrFail(shops!.id)
                shop.token = token
                shop.save()
                await auth.login(shops!)
                Queue.dispatch(new AfterAuthenticateJob({ shop: shops!.name, token: token }))
                response.redirect(Route.makeUrl('home'))
            }
        } else {
            response.status(400).send('Required parameters missing')
        }

    }

    public makeShopUrl(shop) {
        let url = shop
        if (shop.search("https://") == -1 || shop.search("https://") != 0) {
            url = 'https://' + url
        }
        return url.replace(/\/$/, "")
    }

    public makeLoginUrl(domain) {
        const url = {
            url: `${domain}/admin/oauth/authorize`,
            query: {
                client_id: Config.get('shopify-api.api_key'),
                redirect_uri: Config.get('shopify-api.api_redirect'),
                scope: Config.get('shopify-api.api_scopes'),
            }
        };
        return queryString.stringifyUrl(url);
    }

    public verifyHmac(request) {
        const secret = Config.get('shopify-api.api_secret')
        const message = request.get();
        const hmac = message.hmac;
        delete message.hmac;
        const check = crypto.createHmac("sha256", secret).update(queryString.stringify(message)).digest("hex");
        return hmac == check
    }

    public async verifyProxy(request) {
        const secret = Config.get('shopify-api.api_secret')
        const message = request.get();
        const signature = message.signature;
        delete message.signature;
        const check = crypto.createHmac("sha256", secret).update(queryString.stringify(message)).digest("hex");
        return signature == check
    }

    public async verifyWebhook(request) {
        const secret = Config.get('shopify-api.api_secret')
        const header = request.header('X-Shopify-Hmac-SHA256');
        const check = crypto.createHmac("sha256", secret).update(request.raw()).digest("hex");
        return header == check
    }

    public makeTokenUrl(domain) {
        return `https://${domain}/admin/oauth/access_token`;
    }

    public makeTokenData(code) {
        return {
            client_id: Config.get('shopify-api.api_key'),
            client_secret: Config.get('shopify-api.api_secret'),
            code: code
        }
    }
}
export default new AuthHelper()
