import z from "zod";

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(63, "Username must be less than 63 characters")
        .regex(/^[a-z0-9][a-z0-9]*[a-z0-9]$/, "Username can only contain lowercase letters , numbers and hypends. It must start and end with a letter or number.")
        .refine(
            (val) => !val.includes('--'),
            "Username cannot contains consecutive hypens."
        ).transform(
            (val) => val.toLocaleLowerCase()
        )
    //[username].shop.com
});