import mongoose from "mongoose";
import { UserType } from "../types/user-types";

export const userSchema = new mongoose.Schema<UserType>({
    login: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: String, required: true},
    emailConfirmation : {
        confirmationCode: {type: String, required: true},
        expirationDate: {type: Object, required: true},
        isConfirmed: {type: Boolean, required: true},
        nextSend: {type: Object, required: true}
    },
    JWTTokens: {
        accessToken: String,
        refreshToken: String,
    }
})