import { WithId } from "mongodb"

export type AccessLogType = {
    IP: string, 
    URL: string, 
    date: Date
}

export type AccessLogDb = WithId <AccessLogType>

export type AccessLogOutput = AccessLogType & {id: string}