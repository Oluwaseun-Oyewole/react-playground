import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { QuestionComponent } from "../components/UI/Question";
import { Button } from "../components/atom/button";
import { FieldSet } from "../components/atom/field-set";
import { FormField } from "../components/atom/form-field";
import { FormInput } from "../components/molescules/form-input";
import { useLoginContextProvider } from "../hooks/use-login-context";
import type { LoginModelType } from "../model/User";
import { LoginModel } from "../model/User";

export const Login = () => {
  const { setToken, login, persist, setPersist, per, setPer } =
    useLoginContextProvider();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginModelType>({
    resolver: zodResolver(LoginModel),
    mode: "onChange",
  });
  const [maliciousIntent, setMaliciousIntent] = useState("");
  const [error, setError] = useState<any | null>();
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (formValues: LoginModelType) => {
    // For Funny Users With Malicious Intentions
    // We re-run the valiation again

    const password_regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const v1 = formValues.email;
    const v2 = password_regex.test(formValues.password);
    if (!v1 || !v2) {
      setMaliciousIntent("Malicious Intension");
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
      setLoading("loading.....");
      const response = await login(formValues.email, formValues.password);

      const {
        _tokenResponse: { idToken },
      }: any = response;
      setToken(idToken);

      navigate("/posts");
      setLoading("");
    } catch (error) {
      if (error instanceof Error) {
        setError({ ...error, message: error.message });
        setLoading("");
      }
    }
  };

  const togglePersist = () => {
    setPersist((prev: boolean) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div>
      <h1>{maliciousIntent && maliciousIntent}</h1>
      <p>{loading}</p>
      <p aria-invalid={error?.message} className="text-red-500">
        {error && error?.message}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet label="Login Form">
          <>
            <FormField label="Email" id="email">
              <FormInput<LoginModelType>
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
                // autoComplete="off"
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

        <FieldSet>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
              className="cursor-pointer"
            />
            <label htmlFor="persist">Trust this device</label>
          </div>
        </FieldSet>
      </form>
      <div className="flex justify-between items-center">
        <Link to="/password-reset" className="text-blue-500">
          Forgot password?
        </Link>
        <QuestionComponent
          path="/signup"
          children="SignUp"
          message="Already Signup?"
        />
      </div>
    </div>
  );
};
