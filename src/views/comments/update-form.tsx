import { zodResolver } from "@hookform/resolvers/zod";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../components/UI/modal/Modal";
import { Button } from "../../components/atom/button";
import { FormField } from "../../components/atom/form-field";
import { FormTextArea } from "../../components/atom/text-area";
import { db } from "../../config/firebase";
import { useFetchContextProvider } from "../../context/fetch-context";
import type { CommentCreateModelType } from "../../model/Posts";
import { CommentCreateModel } from "../../model/Posts";

type ModalPropType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  successMessage: string;
  description?: string;
  id?: string;
  userId?: string;
};

export const CommentUpdateModal = ({
  showModal,
  setShowModal,
  successMessage = "",
  id,
  description,
  userId,
}: ModalPropType) => {
  const [showPostAction, setPostAction] = useState(false);
  const { states } = useFetchContextProvider();
  const [status, setStatus] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CommentCreateModelType>({
    resolver: zodResolver(CommentCreateModel),
    mode: "onChange",
  });

  const onSubmit = async (formValues: CommentCreateModelType) => {
    try {
      setStatus("Updating...");
      const updatePost = doc(db, "Posts", `${id}`);

      await updateDoc(updatePost, {
        description: formValues?.description,
      });
      setStatus("Updated");
      setPostAction(true);
      setShowModal(false);
    } catch (error) {
      setStatus("Form Update Failed");
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
      <Modal
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
        type="form"
      >
        <>
          <p>{status}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              label="Comment"
              id="Comment"
              className="font-medium my-5"
            >
              <FormTextArea
                id="Comment"
                defaultValue={description}
                name="description"
                label="Form"
                row={10}
                placeholder="Comment"
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
