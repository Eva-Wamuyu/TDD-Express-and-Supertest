import { sqlConfig } from "../Config/index.js";

import mssql from 'mssql'



class DB {

    static async exec(storedProcedure, data = {}) {
        try {
            let request = await (await mssql.connect(sqlConfig)).request();
            request = this.addData(request, data);
            return request.execute(storedProcedure);
        } catch (error) {
            console.log(error);
            return error
        }
    }

    static addData(req, data = {}) {
        const keys = Object.keys(data);

        keys.forEach((keyName) => {
            req.input(keyName, data[keyName]);
        });

        return req;

    }

}

export {DB};