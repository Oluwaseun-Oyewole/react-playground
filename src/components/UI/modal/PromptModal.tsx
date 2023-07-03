import React, { useState } from "react";
import { useLoginContextProvider } from "../../../hooks/use-login-context";
import { Button } from "../../atom/button";
import { Modal } from "./Modal";
import { Notification } from "./Notification";

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
  userId?: string;
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
  userId,
}: ModalPropType) => {
  const [showPostAction, setPostAction] = useState(false);
  const { user } = useLoginContextProvider();
  const [permision, setPermission] = useState("");

  const promptHandler = async () => {
    if (userId === user?.uid) {
      setShowModal(false);
      await handler();
      setPostAction(true);
    } else {
      setPermission(
        "User do not have delete permission to other user's post... "
      );
    }
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
        <p className="text-base"> {!error ? successMessage : error}</p>
      </Modal>
      <Modal
        show={showModal}
        close={() => {
          setShowModal(false);
          setPermission("");
        }}
      >
        <>
          <div className="my-5">
            <Notification permision={permision} />
          </div>
          <div className="text-white font-light text-sm">
            <div>
              <p className="">Post Id -- {id || "Confirm"}</p>
              <p className="">Post Title - {`${title?.substring(0, 40)}...`}</p>
            </div>

            <p className="text-base my-4">{promptMessage}</p>
            <div className="flex space-x-8 w-full my-7">
              <Button children="Cancel" onClick={() => setShowModal(false)} />
              <Button
                children={buttonText}
                className="bg-red-500 hover:opacity-90 hover:bg-red-500 "
                onClick={promptHandler}
              />
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default PromptModal;
