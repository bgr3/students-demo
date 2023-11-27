import { ObjectId } from "mongodb"

export class AccessLogType {
    constructor(
        public IP: string, 
        public URL: string, 
        public date: Date){}
}

export class AccessLogDb extends AccessLogType {
    constructor(
        public _id: ObjectId,
        IP: string, 
        URL: string, 
        date: Date){
            super(IP, URL, date)
        }
}
export type AccessLogOutput = AccessLogType & {id: string}