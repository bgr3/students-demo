import mongoose from "mongoose";
import { AuthType } from "../types/auth-types";

export const authSchema = new mongoose.Schema<AuthType>({
    issuedAt: {type: Date, required: true},
    expiredAt: {type: Date, required: true},
    deviceId: {type: String, required: true},
    deviceIP: {type: String, required: true},
    deviceName: {type: String, required: true},
    userId: {type: String, required: true},
    tokens: {
        accessToken: {type: String, required: true},
        refreshToken: {type: String, required: true},
    }
})

