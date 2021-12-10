import Logger from '@ioc:Adonis/Core/Logger'

export default class LogRequest {
  public async handle({ request, auth}, next: () => Promise<void>) {
    // console.log(`-> ${request.method()}: ${request.url()}`)
    // console.log(request.all());
    
    const request_data = request.all() ? request.all().toString() : "";
    const user_id = auth.user ? auth.user.id : 0;

    Logger.info("--------------------------------------------------------------------");
    Logger.info(`-> ${request.method()} --- ROUTE : ${request.url()} --- BODY : ${request_data} --- USER : ${user_id}`);
    Logger.info(request.all());
    Logger.info("--------------------------------------------------------------------\n\n");
    await next()
  }
}
