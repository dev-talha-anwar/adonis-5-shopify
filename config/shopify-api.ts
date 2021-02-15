import Env from '@ioc:Adonis/Core/Env'

const ShopifyConfig = {
    enabled: true,
    /*
    |--------------------------------------------------------------------------
    | AppBridge Mode
    |--------------------------------------------------------------------------
    |
    | AppBridge (embedded apps) are enabled by default. Set to false to use legacy
    | mode and host the app inside your own container.
    |
    */
    appbridge_enabled: Env.get('SHOPIFY_APPBRIDGE_ENABLED', true),
    /*
    |--------------------------------------------------------------------------
    | Shopify API Version
    |--------------------------------------------------------------------------
    |
    | This option is for the app's API version string.
    | Use "YYYY-MM" or "unstable". Refer to Shopify's documentation
    | on API versioning for the current stable version.
    |
    */
    api_version: Env.get('SHOPIFY_API_VERSION', '2020-01'),
    //check whether app is private 
    is_private: Env.get('SHOPIFY_APP_PRIVATE', false),
    //private app password
    app_password: Env.get('SHOPIFY_APP_PASSWORD', null),
    /*
    |--------------------------------------------------------------------------
    | Shopify API Key
    |--------------------------------------------------------------------------
    |
    | This option is for the app's API key.
    |
    */

    api_key: Env.get('SHOPIFY_API_KEY', ''),

    /*
    |--------------------------------------------------------------------------
    | Shopify API Secret
    |--------------------------------------------------------------------------
    |
    | This option is for the app's API secret.
    |
    */

    api_secret: Env.get('SHOPIFY_API_SECRET', ''),

    /*
    |--------------------------------------------------------------------------
    | Shopify API Scopes
    |--------------------------------------------------------------------------
    |
    | This option is for the scopes your application needs in the API.
    |
    */

    api_scopes: Env.get('SHOPIFY_API_SCOPES', 'read_products,write_products'),
    /*
    |--------------------------------------------------------------------------
    | Shopify API Redirect
    |--------------------------------------------------------------------------
    |
    | This option is for the redirect after authentication.
    |
    */
    api_redirect: Env.get('SHOPIFY_API_REDIRECT', '/authenticate'),
    /*
    |--------------------------------------------------------------------------
    | Enable Billing
    |--------------------------------------------------------------------------
    |
    | Enable billing component to the package.
    |
    */

    billing_enabled: Env.get('SHOPIFY_BILLING_ENABLED', false),

    /*
    |--------------------------------------------------------------------------
    | Enable Freemium Mode
    |--------------------------------------------------------------------------
    |
    | Allow a shop use the app in "freemium" mode.
    | Shop will get a `freemium` flag on their record in the table.
    |
    */

    billing_freemium_enabled: Env.get('SHOPIFY_BILLING_FREEMIUM_ENABLED', false),

    /*
    |--------------------------------------------------------------------------
    | Billing Redirect
    |--------------------------------------------------------------------------
    |
    | Required redirection URL for billing when
    | a customer accepts or declines the charge presented.
    |
    */

    billing_redirect: Env.get('SHOPIFY_BILLING_REDIRECT', '/billing/process'),

    /*
    |--------------------------------------------------------------------------
    | Shopify Webhooks
    |--------------------------------------------------------------------------
    |
    | This option is for defining webhooks.
    | Key is for the Shopify webhook event
    | Value is for the endpoint to call
    |
    */

    webhooks: [
        {
            'topic': 'app/uninstalled',
            'address': Env.get('APP_DOMAIN') + '/webhook/app-uninstalled'
        }
    ],

    /*
    |--------------------------------------------------------------------------
    | Shopify ScriptTags
    |--------------------------------------------------------------------------
    |
    | This option is for defining scripttags.
    |
    */

    scriptTags: [
        /*
            {
                'src' : Env.get('SHOPIFY_SCRIPTTAG_1_SRC', 'https://some-app.com/some-controller/js-method-response'),
                'event' : Env.get('SHOPIFY_SCRIPTTAG_1_EVENT', 'onload'),
                'display_scope' : Env.get('SHOPIFY_SCRIPTTAG_1_DISPLAY_SCOPE', 'online_store')
            },
            
        */
    ]
}

export default ShopifyConfig



