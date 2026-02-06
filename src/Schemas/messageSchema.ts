import {z} from 'zod'

export const messageSchema = z.object({
    content: z
    .string()
    .min(5, {message: "Message must be atleast of 5 characters"})
    .max(300, {message: "Message must be atmost of 300 characters"}),
    createdAt: z.date()
})

