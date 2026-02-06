import {z} from 'zod'

export const usernameValidation = z
  .string()
  .min(2,"Username must be atleast 2 letters")
  .max(10,"Username must be atmost 10 characters")
  .regex(/^[a-zA-Z0-9]+$/ , "Username must not contain special charcaters")

export const loginSchemas = z.object({
    username: usernameValidation,
    password: z.string().min(6,"Password must be atleast 6")
})