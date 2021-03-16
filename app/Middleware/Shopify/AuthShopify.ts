import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShopifyAuth from 'App/Helpers/Shopify/AuthHelper'
import Route from '@ioc:Adonis/Core/Route'
import User from "App/Models/User"
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'


export default class AuthShopify {
  public async handle(
    { auth, request, response, session }: HttpContextContract,
    next: () => Promise<void>
  ) {
    var { hmac, shop } = request.get()
    var SESSION_TOKEN = request.input('session')
    var domain = shop
    if (hmac === null) {
      hmac = null
    }
    if (ShopifyAuth.verifyHmac(request)) {
      hmac = true
    } else {
      hmac = null
    }
    var checks: string[] = []
    await auth.check()
    if (auth.isGuest) {
      console.log('Guest')
      if (hmac === null) {
        throw new UnAuthorizedException('Not allowed')
      }
      checks.push('loginShop')
      try {
        const shop = await User.findBy('name', domain)
        await auth.login(shop)
        var result = true
        session.put('user_session_token', SESSION_TOKEN)
      } catch (error) {
        var result = false
        console.log(error)
      }
      if (result === false) {
        console.log('Bad Verification')
      }
    }
    if (hmac === true) {
      await session.put('user_session_token', SESSION_TOKEN)

        const user = await auth.authenticate()
        if(user !== undefined && user.deletedAt == null)
        {
          if (user.name !== domain) {
            session.forget('shopify_user_session')
            return response.redirect(Route.makeUrl('auth'), { shop: domain })
          }
        }
        else
        {
            session.forget('shopify_user_session')
            return response.redirect(Route.makeUrl('auth'), { shop: domain })
        }

        var c = await session.get('user_session_token')
        if (c !== SESSION_TOKEN) {
          session.forget('user_session_token')
          return response.redirect(Route.makeUrl('auth'), { shop: domain })
        }
      } else {
        return response.redirect(Route.makeUrl('login'))
      }
    }
    await next()
  }
}
