import { logRepository } from "../repositories/access-repository/access-log-db-repository"
import add from 'date-fns/add'

export const accessService = {
    async testAllData (): Promise<void> {
        return logRepository.testAllData()
    },

    async checkaccessFrequency (url: string, ip: string): Promise<boolean> {
        const lastDate = await logRepository.findAccessLogByURLAndIp(url, ip)
        
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

        await logRepository.createAccessLog(log)

        return true
    },
}