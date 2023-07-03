import { zodResolver } from "@hookform/resolvers/zod";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "../../../config/firebase";
import { useFetchContextProvider } from "../../../context/fetch-context";
import { useLoginContextProvider } from "../../../hooks/use-login-context";
import type { PostUpdateModelType } from "../../../model/Posts";
import { PostUpdateModel } from "../../../model/Posts";
import { Button } from "../../atom/button";
import { FormField } from "../../atom/form-field";
import { FormTextArea } from "../../atom/text-area";
import { FormInput } from "../../molescules/form-input";
import { Modal } from "./Modal";
import { Notification } from "./Notification";

type ModalPropType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  successMessage: string;
  title?: string;
  body?: string;
  id?: string;
  post?: () => void;
  userId?: string;
};

export const FormModal = ({
  showModal,
  setShowModal,
  successMessage = "",
  id,
  title,
  body,
  userId,
  post = () => null,
}: ModalPropType) => {
  const [showPostAction, setPostAction] = useState(false);
  const { states } = useFetchContextProvider();
  const [status, setStatus] = useState("");

  const { user } = useLoginContextProvider();
  const [permision, setPermision] = useState("");
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<PostUpdateModelType>({
    resolver: zodResolver(PostUpdateModel),
    mode: "onChange",
  });

  const onSubmit = async (formValues: PostUpdateModelType) => {
    // const res = await jsonInstance.put(
    //   `/posts/${id}`,
    //   JSON.stringify(formInformation),
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );

    // if (userId === auth?.currentUser?.uid) {
    try {
      setStatus("Updating...");
      const updatePost = doc(db, "Posts", `${id}`);

      await updateDoc(updatePost, {
        title: formValues.title,
        body: formValues.body,
      });
      setStatus("Updated");
      setPostAction(true);
      setShowModal(false);
      post();
    } catch (error) {
      setStatus("Form Update Failed");
      // }
      // } else {
      setPermision("User do not have edit permission to other user's post... ");
    }
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
        <p className="text-sm">
          {!states.error ? successMessage : states.error}
        </p>
      </Modal>
      <Modal
        show={showModal}
        close={() => {
          setShowModal(false);
          setPermision("");
        }}
        type="form"
      >
        <>
          <Notification permision={permision} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Title" id="title" className="font-medium">
              <FormInput<PostUpdateModelType>
                id="title"
                type="text"
                size="medium"
                label="name"
                name="title"
                defaultValue={title}
                className="font-medium"
                placeholder="Full Name"
                autoFocus={true}
                register={register}
                errors={errors}
                autoComplete="off"
              />
            </FormField>

            <FormField label="body" id="username" className="font-medium my-5">
              <FormTextArea
                id=""
                defaultValue={body}
                name="body"
                label="Form"
                row={10}
                placeholder="Testing"
                errors={errors}
                register={register}
                className="outline-none font-medium mb-3"
              />
            </FormField>
            <Button children="Submit" type="submit" />
          </form>
        </>
      </Modal>
    </>
  );
};
