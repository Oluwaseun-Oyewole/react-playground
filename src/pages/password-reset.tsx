import { zodResolver } from "@hookform/resolvers/zod";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { QuestionComponent } from "../components/UI/Question";
import { Modal } from "../components/UI/modal/Modal";
import { Button } from "../components/atom/button";
import { FieldSet } from "../components/atom/field-set";
import { FormField } from "../components/atom/form-field";
import { FormInput } from "../components/molescules/form-input";
import type { PasswordModelType } from "../model/User";
import { PasswordModel } from "../model/User";

export const PasswordReset = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<PasswordModelType>({
    resolver: zodResolver(PasswordModel),
    mode: "onChange",
  });

  const [error, setError] = useState<any | null>();
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const [showPostAction, setPostAction] = useState(false);

  const auth = getAuth();

  const onSubmit = async (formValues: PasswordModelType) => {
    try {
      setLoading("loading.....");
      await sendPasswordResetEmail(auth, formValues?.email);
      setPostAction(true);
      reset();
      // navigate("/login");
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
      <Modal
        type="postAction"
        show={showPostAction}
        close={() => {
          setPostAction(false);
        }}
      >
        <div className="flex items-center gap-5">
          <p className={`${error && "text-red-500"} text-sm`}>
            Check your mail for confirmation
          </p>
          <Link to="/login" className="text-xs text-gray-100">
            Back to login
          </Link>
        </div>
      </Modal>

      <p>{loading}</p>
      <p aria-invalid={error?.message} className="text-red-500">
        {error && error?.message}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet label="Password Reset Form">
          <>
            <FormField label="Email" id="email">
              <FormInput<PasswordModelType>
                id="email"
                type="email"
                size="medium"
                label="email"
                name="email"
                className=""
                placeholder="Email Address"
                autoFocus={true}
                register={register}
                errors={errors}
                autoComplete="off"
              />
            </FormField>
          </>
        </FieldSet>

        <FieldSet>
          <Button children="submit" type="submit" />
        </FieldSet>
      </form>

      <QuestionComponent path="/login" children="Back to login" message="" />
    </div>
  );
};
