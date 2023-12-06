import { LogRepository } from "../repositories/access-repository/access-log-db-repository"
import add from 'date-fns/add'
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class AccessService {
    constructor(protected logRepository: LogRepository){}
    async testAllData (): Promise<void> {
        return this.logRepository.testAllData()
    }

    async checkaccessFrequency (url: string, ip: string): Promise<boolean> {
        const lastDate = await this.logRepository.findAccessLogByURLAndIp(url, ip)
        
        if(lastDate[0]){
            if(new Date() < add(lastDate[0], {seconds: 10})){
                if (lastDate[4]) {
                    if (new Date() < add(lastDate[4], {seconds: 10})) return false
                }
            }
        }
    
        const log = {
            URL: url,
            IP: ip,
            date: new Date()
        }

        await this.logRepository.createAccessLog(log)

        return true
    }
}