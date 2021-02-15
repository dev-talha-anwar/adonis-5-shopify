import Logger from '@ioc:Adonis/Core/Logger'

class LoggerHelper {

    public async log(msg) 
    {
        Logger.info(msg)
    }

}
export default new LoggerHelper()
