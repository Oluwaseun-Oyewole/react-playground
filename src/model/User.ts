import { z } from "zod";

export interface RegistrationDataInterface {
  username: string;
  // age: number;
  email: string;
  password: string;
  passwordConfirmation: string | undefined;
}

export interface UpdateUserProfileForm {
  name: string;
  photoURL: string;
}

export const UserUpdateModel = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters" }),
  photoURL: z.string(),
});
export type UpdateUserModelType = z.infer<typeof UserUpdateModel>;

export const LoginModel = z
  .object({
    // username: z
    //   .string({
    //     required_error: "Username is required!!!",
    //     invalid_type_error: "Username must be a string",
    //   })
    //   .nonempty({ message: "Username is required" })
    //   .regex(/^[A-z][A-z0-9-_]{0,23}$/, {
    //     message: "Username should not contain a space e.g. MikeJaden",
    //   })
    //   .min(5, { message: "Username must be at least 5 characters long" })
    //   .refine((val) => val.length <= 10, {
    //     message: "Username can't be more than 10 characters",
    //   }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email cannot be empty." })
      .email("This is not a valid email."),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{0,24}$/, {
        message:
          "Password must contain a capital letter, small letter and special characters",
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

export const PasswordModel = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email cannot be empty." })
    .email("This is not a valid email."),
});

export type PasswordModelType = z.infer<typeof PasswordModel>;

export const PasswordResetModel = z
  .object({
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{0,24}$/, {
        message:
          "Password must contain a capital letter, small letter and special characters",
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

export type PasswordResetModelType = z.infer<typeof PasswordResetModel>;

export const BasicUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name Must be 2 or more characters long" }),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, { message: "Username must be 4 or more characters long" }),
  email: z.string().trim().toLowerCase(),
  phone: z
    .string()
    .min(10, { message: "Phone numbers are a minimum of 10 digits" })
    // .regex(/^[0-9]+$/)
    // .length(10, { message: "Ten numbers are required" })
    .transform((val) => `${val.slice(0, 3)}-${val.slice(3, 6)}-${val.slice(6)}`)
    .optional(),

  // website :z.string()
  // .trim()
  // .toLowerCase().url().optional(),
  website: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, { message: "URLs must be a minimum of 5 characters" })
    .refine((val) => val.indexOf(".") !== -1, { message: "Invalid URLs" })
    .optional(),

  company: z.object({
    name: z
      .string()
      .trim()
      .min(5, { message: "Company name must be 5 or more characters long" }),
    catchPhrase: z.string().optional(),
  }),
});

export const UserAddressSchema = z.object({
  street: z
    .string()
    .trim()
    .min(5, { message: "Street must be 5 or more characters long.." }),
  suite: z.string().trim().optional(),
  city: z.string().trim(),
  zipcode: z.string(),
  //   regex(/^\d{5}(?:[-\s]\d{4}?$)/, {
  // message: "Must be 5 digit zip. Optional 4 digit extension allowed.",
  //   }),
});

const UserAddressSchemaWithGeo = UserAddressSchema.extend({
  geo: z.object({
    lat: z.string(),
    lng: z.string(),
  }),
});
export const HasIDSchema = z.object({ id: z.number().int().positive() });

export const UserSchemaWithAddress = BasicUserSchema.extend({
  address: UserAddressSchema,
}).merge(HasIDSchema);

export const UserSchemaWithGeo = BasicUserSchema.extend({
  address: UserAddressSchemaWithGeo,
}).merge(HasIDSchema);

export type UserWithAddress = z.infer<typeof UserSchemaWithAddress>;
export type UserWithGeo = z.infer<typeof UserSchemaWithGeo>;
