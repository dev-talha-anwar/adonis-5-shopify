import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShopifyAuth from 'App/Helpers/Shopify/AuthHelper'

export default class AuthProxy {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    if (!ShopifyAuth.verifyProxy(request)) {
      console.log("Proxy Mismatch.")
      return
    }
    await next()
  }
}
