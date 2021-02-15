import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'

export default class UnAuthorizedException extends Exception {
  constructor(message: string) {
    super(message, 401)
  }

  /**
   * Implement the handle method to manually handle this exception.
   * Otherwise it will be handled by the global exception handler.
   */
  public async handle(error: this, { response }: HttpContextContract) {
    // response.status(error.status).send('<h1>Sorry you are not allowed to view this page</h1>')
    response.redirect(Route.makeUrl('login'))
  }
}
