import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'

export default class Guest {
  public async handle ({auth,response}: HttpContextContract, next: () => Promise<void>) {
    if(auth.isLoggedIn){
      return response.redirect(Route.makeUrl('index'))
    }
    await next()
  }
}
