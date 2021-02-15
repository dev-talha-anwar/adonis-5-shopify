import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.get("/", "WelcomeController.index").as("home")
    Route.get("/home", "WelcomeController.index")
    Route.get("/auth/home", "WelcomeController.index")
    // Route.get("/auth/auth", "WelcomeController.index")

}).middleware('auth.shopify')

Route.group(() => {

    Route.get("/login", "LoginController.loginForm").as('login');
    Route.get("/auth", "LoginController.auth").as('auth');
    Route.get("/auth/callback", "LoginController.loginRedirect").as('auth.callback');

}).namespace('App/Controllers/Http/Auth/Shopify')
// .middleware('guest');
