export default class Cors {
  public async handle({ request }, next: () => Promise<void>) {
    // console.log(request.headers())
    await next()
  }
}
