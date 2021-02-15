/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import View from '@ioc:Adonis/Core/View'
import Env from '@ioc:Adonis/Core/Env'
import Config from '@ioc:Adonis/Core/Config'


View.global('timestamp', () => {
  return new Date().getTime()
})

View.global('base_url', () => {
  return Env.get('HOST')
})

View.global('app_bridge', () => {
  return Config.get('shopify-api.appbridge_enabled')
})

View.global('app_key', () => {
  return Config.get('shopify-api.api_key')
})
