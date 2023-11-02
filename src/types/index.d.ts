import { UserDb, UserOutput } from "./user-types";

declare global {
    declare namespace Express {
        export interface Request {
            user: UserDb | null
        }
    }
}
