import {z} from "zod"

export const acceptingMessage = z.object({
    signal: z.boolean()
})