import ShopifyApiHelper from 'App/Helpers/Shopify/ShopifyApiHelper'
import Config from '@ioc:Adonis/Core/Config'

class ShopifyHelper extends ShopifyApiHelper {

	public async shopApi(ApigetFields = {}, token = undefined, name = undefined) {
		this.getInstance(token, name)
		return await this.instance.shop.get(ApigetFields);
	}

	public async createDefaultData(token, name) {
		this.getInstance(token, name)
		const defaultWebhooks = Config.get('shopify-api.webhooks');
		for (const webhook of defaultWebhooks) {
			await this.instance.webhook.create({
				topic: webhook.topic,
				address: webhook.address
			});
		}
		const defaultScriptTags = Config.get('shopify-api.scriptTags');
		for (const scriptTag of defaultScriptTags) {
			await this.instance.scriptTag.create({
				event: scriptTag.event,
				src: scriptTag.src
			});
		}
	}

}
export default new ShopifyHelper()
