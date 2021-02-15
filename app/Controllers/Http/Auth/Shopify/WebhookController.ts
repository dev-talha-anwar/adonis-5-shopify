// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const queryString = require('query-string');
import Queue from '@ioc:Adonis5/Queue'
import CustomerRedactRequestJob from 'App/Jobs/Producers/CustomersDataRequestJob'
import CustomerRedactJob from 'App/Jobs/Producers/CustomersRedactJob'
import ShopRedactJob from 'App/Jobs/Producers/ShopRedactJob'
import AppUninstalledJob from 'App/Jobs/Producers/AppUninstalledJob'

export default class WebhookController {

    public Jobs = {
        AppUninstalledJob: AppUninstalledJob
    }

    public async customerDataRequest({ request, response }) {
        Queue.dispatch(new CustomerRedactRequestJob(request.all()))
        return response.status(200)
    }

    public async customerRedact({ request, response }) {
        Queue.dispatch(new CustomerRedactJob(request.all()))
        return response.status(200)
    }

    public async shopRedact({ request, response }) {
        Queue.dispatch(new ShopRedactJob(request.all()))
        return response.status(200)
    }

    public async handleWebhook({ request, response }) {
        let url = queryString.parseUrl(request.url()).url
        url = url.substring(url.lastIndexOf('/') + 1)
        url = url.replace(/(^\w|-\w)/g, url.replace(/-/, "").toUpperCase())
        Queue.dispatch(new this.Jobs[url](request.all()))
        return response.status(200)
    }
}
