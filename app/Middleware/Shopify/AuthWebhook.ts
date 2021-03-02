import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShopifyAuth from 'App/Helpers/Shopify/AuthHelper'


export default class AuthWebhook {
	public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
		if (!ShopifyAuth.verifyWebhook(request)) {
			console.log("Webhook Mismatch.")
			return
		}
		await next()
	}
}
