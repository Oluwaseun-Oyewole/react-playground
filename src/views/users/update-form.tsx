import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../components/UI/modal/Modal";
import { Button } from "../../components/atom/button";
import { FormField } from "../../components/atom/form-field";
import { FormInput } from "../../components/molescules/form-input";
import { useFetchContextProvider } from "../../context/fetch-context";
import { useLoginContextProvider } from "../../hooks/use-login-context";
import type { UpdateUserProfileForm } from "../../model/User";
import { UpdateUserModelType, UserUpdateModel } from "../../model/User";

type ModalPropType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  successMessage: string;
  description?: string;
  id?: string;
  userId?: string;
};

export const UpdateUserFormModal = ({
  showModal,
  setShowModal,
  successMessage = "",
}: ModalPropType) => {
  const [showPostAction, setPostAction] = useState(false);
  const { states } = useFetchContextProvider();
  const [status, setStatus] = useState("");
  const { updateUserProfile } = useLoginContextProvider();
  const [imageUpload, setImageUpload] = useState("");
  const [name, setName] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<UpdateUserModelType>({
    resolver: zodResolver(UserUpdateModel),
    mode: "onChange",
  });

  const onSubmit = async (formValues: UpdateUserProfileForm) => {
    try {
      setStatus("Updating...");
      await updateUserProfile(formValues?.name, formValues?.photoURL);
      setStatus("Updated");
      setPostAction(true);
      setShowModal(false);
    } catch (error) {
      setStatus("Form Update Failed");
    }
    reset();
  };

  return (
    <>
      <Modal
        type="postAction"
        show={showPostAction}
        close={() => {
          setPostAction(false);
        }}
      >
        {!states.error ? successMessage : states.error}
      </Modal>
      <Modal
        show={showModal}
        close={() => {
          setShowModal(false);
          reset();
        }}
        type="form"
      >
        <>
          <p>{status && status}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Name" id="name" className="font-medium">
              <FormInput<UpdateUserProfileForm>
                id="name"
                type="text"
                size="medium"
                label="name"
                name="name"
                className="font-medium"
                placeholder="Name..."
                autoFocus={true}
                register={register}
                errors={errors}
                autoComplete="off"
              />
            </FormField>

            <FormField label="photoURL" id="photoURL" className="font-medium">
              <FormInput<UpdateUserProfileForm>
                id="photoURL"
                type="text"
                size="medium"
                label="photoURL"
                name="photoURL"
                className="font-medium"
                placeholder="PhotoURL..."
                autoFocus={true}
                register={register}
                errors={errors}
                autoComplete="off"
              />
            </FormField>
            <Button children="Submit" type="submit" />
          </form>
        </>
      </Modal>
    </>
  );
};
