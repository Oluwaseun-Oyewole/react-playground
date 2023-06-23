import React, { useState } from "react";
import { Button } from "../../atom/button";
import { Modal } from "./Modal";

type ModalPropType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  successMessage: string;
  promptMessage: string;
  handler: () => void;
  buttonText: string;
  title: string;
  error?: string;
  id: string;
};

const PromptModal = ({
  showModal,
  setShowModal,
  successMessage = "",
  promptMessage = "",
  handler = () => null,
  buttonText = "",
  title = "",
  id,
  error,
}: ModalPropType) => {
  const [showPostAction, setPostAction] = useState(false);
  const promptHandler = async () => {
    setShowModal(false);
    await handler();
    setPostAction(true);
  };

  return (
    <>
      <Modal
        error={error}
        type="postAction"
        show={showPostAction}
        close={() => {
          setPostAction(false);
        }}
      >
        {!error ? successMessage : error}
      </Modal>
      <Modal show={showModal} close={() => setShowModal(false)}>
        <div className="text-white font-medium">
          <div>
            <p className="">id -- {id || "Confirm"}</p>
            <p className="">title - {title}</p>
          </div>

          <p className="text-white md:text-lg my-4">{promptMessage}</p>
          <div className="flex space-x-8 w-full my-7">
            <Button children="Cancel" onClick={() => setShowModal(false)} />
            <Button
              children={buttonText}
              className="bg-red-500 hover:opacity-90 hover:bg-red-500 "
              onClick={promptHandler}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PromptModal;
