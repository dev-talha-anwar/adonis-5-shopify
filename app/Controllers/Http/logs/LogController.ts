// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const fs = require('fs')
const qs = require('querystring')
import Application from '@ioc:Adonis/Core/Application'

export default class LogController {

    async index({view,request,response}){ 
        let data = [];
        if(request.input('clean',null)){
            await fs.truncate(Application.appRoot+"/app.log", 0, (err) => {});
            return response.json({data : data});
        }
        const readline = require('readline');
        let myInterface = readline.createInterface({
            input: fs.createReadStream(Application.appRoot+"/app.log"),
        });
        for await (const line of myInterface) {
            data.push(line);
        }
        if (request.ajax()) {
            const content =view.render('logs.table', { data : data });
            return response.json({data : content});
        }
        return view.render("logs.log", { data : data });
    }

}
