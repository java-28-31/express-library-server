import mysql, {Pool} from "mysql2/promise"
import dotenv from "dotenv";
import {Roles} from "../utils/libTypes.js";
import confJson from "../../config/lib-config.json" with {type:'json'}

export type AppConfig = {
    port: number,
    skipRoutesArr:string[],
    pathRoles: Record<string, string[]>,
   // createSqlPool:() => Pool
}
export const config:AppConfig = {...confJson,
    // createSqlPool: () => {
    //     return mysql.createPool({
    //         host:process.env.SQL_HOST,
    //         port: +process.env.SQL_PORT!,
    //         user:process.env.SQL_USER || "root",
    //         password:process.env.SQL_PASSWORD,
    //         database:process.env.SQL_DB_NAME
    //     })
    // }
}


// export  const PORT = 3050;

 export const createSqlPool = () => {
    return mysql.createPool({
         host:process.env.SQL_HOST,
         port: +process.env.SQL_PORT!,
         user:process.env.SQL_USER || "root",
         password:process.env.SQL_PASSWORD,
         database:process.env.SQL_DB_NAME
     })
 }

 //export const skipRoutesArr = ["POST/account", "POST/account/login"];

// export const pathRoles = {
//     //=============Accounting=================
//     "GET/account/byId": [Roles.READER],
//     "PATCH/account/password":[Roles.READER],
//     "PATCH/account/update":[Roles.ADMIN],
//     "DELETE/account":[Roles.SUPERVISOR],
//     "PATCH/account/roles":[Roles.SUPERVISOR],
//     //================Books===================
//     "GET/api/books":[Roles.READER],
//     "POST/api/books":[Roles.LIBRARIAN],
//     "DELETE/api/books":[Roles.LIBRARIAN],
//     "GET/api/books/author":[Roles.READER],
//     "PATCH/api/books/pick":[Roles.LIBRARIAN],
//     "PATCH/api/books/return":[Roles.LIBRARIAN],
// }

