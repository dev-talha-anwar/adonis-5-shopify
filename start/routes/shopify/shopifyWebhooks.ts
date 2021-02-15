import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.post("customers/data_request", "WebhookController.customerDataRequest")
    Route.post("customers/redact", "WebhookController.customerRedact")
    Route.post("shop/redact", "WebhookController.shopRedact")
    Route.post("*", "WebhookController.handleWebhook")

}).middleware('auth.webhook').prefix('webhook/').namespace('App/Controllers/Http/Auth/Shopify')