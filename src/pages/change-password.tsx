import { zodResolver } from "@hookform/resolvers/zod";
import { getAuth, updatePassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { QuestionComponent } from "../components/UI/Question";
import { Button } from "../components/atom/button";
import { FieldSet } from "../components/atom/field-set";
import { FormField } from "../components/atom/form-field";
import { FormInput } from "../components/molescules/form-input";
import type { PasswordResetModelType } from "../model/User";
import { PasswordResetModel } from "../model/User";

export const ChangePassword = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<PasswordResetModelType>({
    resolver: zodResolver(PasswordResetModel),
    mode: "onChange",
  });

  const [error, setError] = useState<any | null>();
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const auth: any = getAuth();

  const onSubmit = async (formValues: PasswordResetModelType) => {
    try {
      setLoading("loading.....");
      await updatePassword(auth?.currentUser, formValues?.password);
      navigate("/login");
      setLoading("");
    } catch (error) {
      if (error instanceof Error) {
        setError({ ...error, message: error.message });
        setLoading("");
      }
    }
  };

  return (
    <div>
      <p>{loading}</p>
      <p aria-invalid={error?.message} className="text-red-500">
        {error && error?.message}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet label="Password Change Form">
          <>
            <FormField label="Password" id="password">
              <FormInput<PasswordResetModelType>
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
              <FormInput<PasswordResetModelType>
                id="passwordConfirmation"
                name="passwordConfirmation"
                register={register}
                size="medium"
                className=""
                type="password"
                placeholder="confirm Password"
                errors={errors}
              />
            </FormField>
          </>
        </FieldSet>

        <FieldSet>
          <Button children="submit" type="submit" />
        </FieldSet>
      </form>

      <QuestionComponent path="/user" children="User" message="" />
    </div>
  );
};
