import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { jsonInstance } from "../../../api/axios";
import { useFetchContextProvider } from "../../../context/fetch-context";
import type { PostUpdateModelType } from "../../../model/Posts";
import { PostUpdateModel } from "../../../model/Posts";
import { Button } from "../../atom/button";
import { FormField } from "../../atom/form-field";
import { FormTextArea } from "../../atom/text-area";
import { FormInput } from "../../molescules/form-input";
import { Modal } from "./Modal";

type ModalPropType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  successMessage: string;
  title?: string;
  body?: string;
  id?: string;
};

export const FormModal = ({
  showModal,
  setShowModal,
  successMessage = "",
  id,
}: ModalPropType) => {
  const [showPostAction, setPostAction] = useState(false);

  const { states, fetchedLoad, errorLoad } = useFetchContextProvider();

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
    const formInformation = {
      title: formValues.title,
      body: formValues.description,
      userId: 1,
      id: 7,
    };
    const res = await jsonInstance.put(
      `/posts/${id}`,
      JSON.stringify(formInformation),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    fetchedLoad(res?.data);
    try {
      if (res?.status === 200) {
        setShowModal(false);
        setPostAction(true);
        reset();
      }
    } catch (error: any) {
      errorLoad(error);
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
        {!states.error ? successMessage : states.error}
      </Modal>
      <Modal show={showModal} close={() => setShowModal(false)} type="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Title" id="title" className="font-medium">
            <FormInput<PostUpdateModelType>
              id="title"
              type="text"
              size="medium"
              label="name"
              name="title"
              defaultValue={states?.data?.title}
              className="font-medium"
              placeholder="Full Name"
              autoFocus={true}
              register={register}
              errors={errors}
              autoComplete="off"
            />
          </FormField>

          <FormField
            label="Description"
            id="username"
            className="font-medium my-5"
          >
            <FormTextArea
              id=""
              defaultValue={states?.data?.body}
              name="description"
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
      </Modal>
    </>
  );
};
