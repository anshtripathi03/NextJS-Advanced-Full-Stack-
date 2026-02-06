import {string, z} from 'zod'

export const verifyCode = z.object({
    code: z
    .string()
    .length(6,{message: "Code Must be 6 Characters"})
})