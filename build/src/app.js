import { launchServer } from "./server.js";
import * as mongoose from "mongoose";
import { DB } from "./configurations/appConfig.js";
mongoose.connect(DB).then(() => {
    console.log("Mongo db connected");
    launchServer();
}).catch(err => {
    console.log("Mongo connection failed");
});
