import { z } from "zod";

export interface RegistrationDataInterface {
  username: string;
  age: number;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const LoginModel = z
  .object({
    username: z
      .string({
        required_error: "Username is required!!!",
        invalid_type_error: "Username must be a string",
      })
      .nonempty({ message: "Username is required" })
      .regex(/^[A-z][A-z0-9-_]{0,23}$/, {
        message: "Username shoud not contain a space e.g. MikeJaden",
      })
      .min(5, { message: "Username must be at least 5 characters long" })
      .refine((val) => val.length <= 10, {
        message: "Username can't be more than 10 characters",
      }),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{0,24}$/, {
        message:
          "Password must contain a capital letter, small leter and special characters",
      })
      .min(10, {
        message: "Password character must be less than 10 characters",
      }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // path of error
  });

export type LoginModelType = z.infer<typeof LoginModel>;
