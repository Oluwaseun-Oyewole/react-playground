import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../components/UI/modal/Modal";
import { Button } from "../../components/atom/button";
import { FormField } from "../../components/atom/form-field";
import { FormTextArea } from "../../components/atom/text-area";
import { FormInput } from "../../components/molescules/form-input";
import { auth, db } from "../../config/firebase";
import type { PostUpdateModelType } from "../../model/Posts";
import { PostUpdateModel } from "../../model/Posts";

type ModalPropType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  successMessage: string;
  title?: string;
  body?: string;

  setPosts: React.Dispatch<React.SetStateAction<any>>;
};

export const CreateFormModal = ({
  showModal,
  setShowModal,
  successMessage = "",
  setPosts,
}: ModalPropType) => {
  const [showPostAction, setPostAction] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [error, setError] = useState<any>();

  const postCollections = collection(db, "Posts");
  const getAllPosts = async () => {
    const userId = auth?.currentUser?.uid;
    try {
      const data = await getDocs(postCollections);
      const filteredPosts = data?.docs.map((doc) => {
        return { ...doc.data(), id: doc.id, userId: userId };
      });
      setPosts(filteredPosts);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

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
    try {
      await addDoc(postCollections, {
        ...formValues,
        userId: auth?.currentUser?.uid,
      });
      setFormModal(false);
      setPostAction(true);
      reset();
      getAllPosts();
    } catch (error) {
      console.log("error", error);
      setError(error?.message);
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
        <p className={`${error && "text-red-500"}`}>
          {!error ? successMessage : error}
        </p>
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
              className="font-medium"
              placeholder="Title"
              autoFocus={true}
              register={register}
              errors={errors}
              autoComplete="off"
            />
          </FormField>

          <FormField label="body" id="username" className="font-medium my-5">
            <FormTextArea
              id=""
              name="body"
              label="Form"
              row={10}
              placeholder="Body"
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
