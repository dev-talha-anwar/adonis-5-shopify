// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class WelcomeController {
    
    public async index({view,auth})
    {   
        const user = auth.authenticate()
        return view.render('index',{user: user})
    }
}
