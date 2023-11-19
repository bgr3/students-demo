import mongoose from "mongoose";
import { AccessLogType } from "../types/access-log-types";

export const accessLogSchema = new mongoose.Schema<AccessLogType>({
    IP: {type: String, required: true},
    URL: {type: String, required: true},
    date: {type: Date, required: true},
})


