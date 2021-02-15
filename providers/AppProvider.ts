import { IocContract } from '@adonisjs/fold'

export default class AppProvider {
  public static needsApplication = true

  constructor(protected container: IocContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    const App = await import('@ioc:Adonis/Core/Application')
    // App is ready
    if (App.default.environment === 'web') {
      await import('../start/socket')
    }
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
