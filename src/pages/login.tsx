import { Button } from "../components/atom/button";
import { FieldSet } from "../components/atom/field-set";
import { FormField } from "../components/atom/form-field";
import { FormInput } from "../components/molescules/form-input";
import { useRegistrationForm } from "../hooks/useForm";
import { RegistrationDataInterface } from "../model/User";

export const Login = () => {
  const { register, errors, onSubmit } = useRegistrationForm();

  return (
    <div>
      <form onSubmit={onSubmit}>
        <FieldSet label="Login Form">
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
