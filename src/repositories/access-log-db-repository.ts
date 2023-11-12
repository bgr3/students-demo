import { accessLogCollection } from "../db/db"
import { AccessLogOutput, AccessLogType } from "../types/access-log-types";

export const logRepository = {
    async testAllData (): Promise<void> {
        const result = await accessLogCollection.deleteMany({})
        //console.log('accessLog delete: ', result.deletedCount)
    },

    async createAccessLog (accessNote: AccessLogType): Promise<string | null> {

        const result = await accessLogCollection.insertOne(accessNote);
        //console.log(result.insertedId)
        if (result.insertedId) {
            return result.insertedId.toString()
        } else {
            return null
        }
    },

    async findAccessLogByURLAndIp (URL: string, IP: string): Promise<Date[]> {
        const result = (await accessLogCollection.find({$and: [{URL: URL}, {IP: IP}]}).sort({date: -1}).limit(5).toArray()).map(i => i.date);
        return result
    },


}