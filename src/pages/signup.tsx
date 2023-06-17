import { Button } from "../components/atom/button";
import { FieldSet } from "../components/atom/field-set";
import { FormField } from "../components/atom/form-field";
import { NumberInput } from "../components/atom/number-input";
import { FormInput } from "../components/molescules/form-input";
import { useRegistrationForm } from "../hooks/useForm";
import { RegistrationDataInterface } from "../model/User";

export const Signup = () => {
  const { register, errors, onSubmit, control, Controller } =
    useRegistrationForm();

  return (
    <div>
      <form onSubmit={onSubmit}>
        <FieldSet label="Signup Form">
          <>
            <FormField label="Username" id="username">
              <FormInput
                id="username"
                type="text"
                size="medium"
                label="name"
                name="username"
                className=""
                placeholder="Full Name"
                autoFocus={true}
                register={register}
                errors={errors}
                autoComplete="off"
              />
            </FormField>
            <FormField label="Email" id="email">
              <FormInput
                id="email"
                type="email"
                size="medium"
                label="email"
                name="email"
                className=""
                placeholder="Email"
                register={register}
                errors={errors}
              />
            </FormField>
            <FormField id="age" label="Age">
              <Controller
                name="age"
                control={control}
                defaultValue={1}
                render={({ field: { ref, ...field } }) => (
                  <NumberInput
                    {...field}
                    id="amount"
                    name="amount"
                    label="amount"
                    errors={errors}
                  />
                )}
              />
            </FormField>
            <FormField label="Password" id="password">
              <FormInput<RegistrationDataInterface>
                id="password"
                name="password"
                size="medium"
                type="password"
                className=""
                placeholder="Password"
                register={register}
                errors={errors}
              />
            </FormField>

            <FormField id="passwordConfirmation" label="Confirm Password">
              <FormInput<RegistrationDataInterface>
                id="passwordConfirmation"
                name="passwordConfirmation"
                register={register}
                size="medium"
                className=""
                type="password"
                placeholder="confirmPassword"
                errors={errors}
              />
            </FormField>
          </>
        </FieldSet>

        <FieldSet>
          <Button children="submit" type="submit" />
        </FieldSet>
      </form>
    </div>
  );
};
