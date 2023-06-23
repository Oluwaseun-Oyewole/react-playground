import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { instance } from "../api/axios";
import { QuestionComponent } from "../components/UI/Question";
import { Backdrop } from "../components/UI/modal/Backdrop";
import { Modal } from "../components/UI/modal/Modal";
import { Button } from "../components/atom/button";
import { FieldSet } from "../components/atom/field-set";
import { FormField } from "../components/atom/form-field";
import { FormInput } from "../components/molescules/form-input";
import { useLoginContextProvider } from "../hooks/use-login-context";
import type { LoginModelType } from "../model/User";
import { LoginModel } from "../model/User";

export const Login = () => {
  const { setToken } = useLoginContextProvider();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginModelType>({
    resolver: zodResolver(LoginModel),
    mode: "onChange",
  });
  const [maliciousIntent, setMaliciousIntent] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (formValues: LoginModelType) => {
    // For Funny Users With Malicious Intentions
    // We re-run the valiation again
    const username_regex = /^[A-z][A-z0-9-_]{3,23}$/;
    const password_regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const v1 = username_regex.test(formValues.username);
    const v2 = password_regex.test(formValues.password);
    if (!v1 || !v2) {
      setMaliciousIntent("Malicious Intension....");
      return;
    }
    try {
      // const response = await instance.post(
      //   "whateer-post-endpoint",
      //   JSON.stringify(formValues),
      //   {
      //     headers: { "Content-Type": "application/json" },
      //     withCredentials: true,
      //   }
      // );
      // const data = await response.data;

      if (
        formValues.username === "Samuel" &&
        formValues.password === "Samuel2023@"
      ) {
        navigate("/dashboard");
        setToken("12345");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("error", error);
      }
    }
  };

  // useEffect(() => {}, []);

  return (
    <div>
      <InfoModal />
      <h1>{maliciousIntent && maliciousIntent}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet label="Login Form">
          <>
            <FormField label="Username" id="username">
              <FormInput<LoginModelType>
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
              <FormInput<LoginModelType>
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
              <FormInput<LoginModelType>
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
      <QuestionComponent
        path="/signup"
        children="SignUp"
        message="Already Signup ?"
      />
    </div>
  );
};

export const InfoModal = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <>
      <Backdrop />
      <Modal
        show={show}
        close={() => setShow(false)}
        children={"FullName -- Samuel, Password -- Samuel2023@"}
      />
    </>
  );
};
