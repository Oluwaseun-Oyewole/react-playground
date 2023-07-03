import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../components/UI/modal/Modal";
import { Button } from "../../components/atom/button";
import { FormField } from "../../components/atom/form-field";
import { FormTextArea } from "../../components/atom/text-area";
import { db } from "../../config/firebase";
import type { CommentCreateModelType } from "../../model/Posts";
import { CommentCreateModel } from "../../model/Posts";

type ModalPropType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  successMessage: string;
  id: string;
};

export const CreateCommentFormModal = ({
  showModal,
  setShowModal,
  successMessage = "",
  id,
}: ModalPropType) => {
  const [showPostAction, setPostAction] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [error, setError] = useState("");

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
      const docRef = doc(db, `Posts/${id}/comments`, formValues?.description);
      await setDoc(docRef, {
        description: formValues?.description,
      });
      setFormModal(false);
      setPostAction(true);
      reset();
    } catch (error) {
      setError("An Error has occurred");
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
        <p className="text-sm">{!error ? successMessage : error}</p>
      </Modal>
      <Modal show={showModal} close={() => setShowModal(false)} type="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Comment" id="Comment" className="font-medium my-5">
            <FormTextArea
              id=""
              name="description"
              label="Form"
              row={10}
              placeholder="comment"
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
