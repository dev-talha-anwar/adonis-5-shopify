// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ShopifyAuth from 'App/Helpers/Shopify/AuthHelper'

export default class LoginController {

    public async loginForm({ view }) {
        return view.render("auth.login")
    }

    public async auth({ request, view }) {
        return ShopifyAuth.auth({ request, view });
    }

    public async loginRedirect({ request, response, auth, session }) {
        return ShopifyAuth.loginRedirectCallback({ request, session, response, auth });
    }

}
