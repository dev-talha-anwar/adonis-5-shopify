/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
// import Shopify from 'App/Helpers/Shopify/ShopifyHelper'
import './routes/index.ts'

Route.get("/logs", "logs/LogController.index").as('logs');
Route.get('test', async ({ response }) => {
    // await Shopify.getInstance('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', 'alphaabc.myshopify.com').instance.webhook.create({ 'topic': "products/update", 'address': 'https://crispyshopify.tk/webhook/products-update' })
    // return await Shopify.instance.webhook.list();
})
// Route.any("index.php",({ response }) => {
//     return response.route('login'); 
// });

// Route.any("*","WelcomeController.index");