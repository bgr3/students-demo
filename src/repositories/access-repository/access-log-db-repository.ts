import { AccessLogModel } from "../../db/db"
import { AccessLogType } from "../../types/access-log-types";

export class LogRepository {
    async testAllData (): Promise<void> {
        const result = await AccessLogModel.deleteMany({})
        //console.log('accessLog delete: ', result.deletedCount)
    }

    async createAccessLog (accessNote: AccessLogType): Promise<string | null> {

        const result = await AccessLogModel.insertMany([accessNote]);
        //console.log(result.insertedId)
        if (result[0]._id) {
            return result[0]._id.toString()
        } else {
            return null
        }
    }

    async findAccessLogByURLAndIp (URL: string, IP: string): Promise<Date[]> {
        const result = (await AccessLogModel.find({$and: [{URL: URL}, {IP: IP}]}).sort({date: -1}).limit(5).lean()).map(i => i.date);
        return result
    }


}