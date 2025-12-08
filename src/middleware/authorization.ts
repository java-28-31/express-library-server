import {AuthRequest, Roles} from "../utils/libTypes.js";
import {Response, NextFunction} from "express";
import {HttpError} from "../errorHandler/HttpError.js";
import {config} from "../configurations/appConfig.js";

export const authorize = (pathRoles:Record<string, Roles[]>) => {
    return (req:AuthRequest, res:Response, next:NextFunction) => {
        const roles = req.roles;
        const route = req.method + req.path;
        if(!roles || roles.some(r => pathRoles[route].includes(r))){
            next();
        }

        else throw  new HttpError(403, "");
    }
}
export const requestLimitControl = (list:Map<number, number[]>) => {
    return (req:AuthRequest, res:Response, next:NextFunction) => {
        const roles = req.roles;
        const id = +req.userId!;
        const currentTime = Date.now();
        if(roles?.length === 1 && roles.includes(Roles.READER)){
            const rec = list.get(id);
            if(!rec || currentTime-rec[0] > config.timeWindowMs)
                list.set(id, [currentTime])
            else {
                if(rec.length >= config.requestLimit)
                    throw  new HttpError(403, "Too many requests");
                else
                    rec.push(currentTime)
            }
        }

        next();
    }
}