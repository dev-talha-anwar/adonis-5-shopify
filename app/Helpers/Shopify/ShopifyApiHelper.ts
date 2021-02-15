// import Logger from '@ioc:Adonis/Core/Logger'
import Config from '@ioc:Adonis/Core/Config'
const ShopifyApiNode = require('shopify-api-node')

import axios from 'axios'

class ShopifyApiHelper {

	public token;
	public name;
	public instance;

	public getInstance(token, name) {
		if (!this.instance) {
			this.token = token
			this.name = name
			if (ShopifyApiNode) {
				let config: any = {
					shopName: name,
					accessToken: token,
					apiVersion: Config.get(`shopify-api.api_version`),
					autoLimit: true
				}
				if (Config.get(`shopify-api.is_private`)) {
					config.apiKey = Config.get(`shopify-api.api_key`)
					config.password = Config.get(`shopify-api.app_password`)
				}
				this.instance = new ShopifyApiNode(config);
			}
		}
		return this
	}

	public async apiCall(url, type, data) {
		try {
			let config: any = {
				method: type,
				url: url,
				headers: {
					"X-Shopify-Access-Token": this.token,
				},
			}
			if (type == 'GET') {
				config.params = data
			} else {
				config.data = data
			}
			return await axios(config);
		} catch (error) {
			return error;
		}
	}

	async graph(query, parameters: any = undefined, api_required_fields: any = undefined, api_type = 'query', other_params: any = undefined, name = undefined, token = undefined) {
		this.getInstance(token, name);
		let url = 'https://' + this.name + Config.get(`shopifyApi.graph.endpoint`);
		let call = await this.apiCall(url, Config.get(`shopifyApi.graph.method`), this.makeGraphRequest(query, parameters, api_type, other_params));
		const response = call.body;
		call = call.body;
		if (call.hasOwnProperty('data')) {
			call = call.data;
		}
		if (api_required_fields) {
			for (const value of api_required_fields) {
				if (!call.hasOwnProperty(value)) {
					return call;
				}
				call = call[value];
			}
		}
		return {
			'errors': call.hasOwnProperty('errors'),
			'response': response,
			'body': call,
		};
	}

	makeGraphRequest(query, parameters = undefined, api_type = 'query', other_params = undefined) {
		let data = [];
		let count = 0;
		for (const value of Config.get(`shopifyApi.graph.${api_type}.${query}`)) {
			if (parameters) {
				data.push(value);
				for (const param of parameters) {
					data.push(param);
				}
				parameters = undefined;
			} else {
				data.push(value);
			}
			if (other_params) {
				if (other_params.length - 1 >= count) {
					data.push(other_params[count]);
				}
			}
			count++;
		}
		return JSON.stringify({ [api_type]: data.join(' ') });
	}
}
export default ShopifyApiHelper
