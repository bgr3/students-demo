import { AuthModel } from "../../db/db"
import { AuthTypeOutput, DbAuthType } from "../../types/auth-types";

export class AuthQueryRepository {
    async findAuthSessionsByUserId (userId: string): Promise<AuthTypeOutput[] | null> {
        const session = await AuthModel.find({userId: userId}).lean();
        return session.map(i => authMapper(i))
    }
}

const authMapper = (session: DbAuthType): AuthTypeOutput => {
    return {
        ip: session.deviceIP,
        title: session.deviceName,
        lastActiveDate: session.issuedAt.toISOString(),
        deviceId: session.deviceId
    }
}