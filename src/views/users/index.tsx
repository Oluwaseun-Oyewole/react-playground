import { ReactElement, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdWifiPassword } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { Navigation } from "../../components/Navigation";
import { Backdrop } from "../../components/UI/modal/Backdrop";
import { Modal } from "../../components/UI/modal/Modal";
import { useLoginContextProvider } from "../../hooks/use-login-context";
import { DashboardLinks } from "../../utils";
import { UpdateUserFormModal } from "./update-form";

export const Users = () => {
  const { user, emailVerification } = useLoginContextProvider();
  const [show, setShow] = useState(false);
  const [click, setClick] = useState(false);

  const [status, setStatus] = useState("");

  const handleEmailVerification = () => {
    try {
      emailVerification();
      setClick(true);
    } catch (error) {
      setStatus("Not a valid Email Address");
    }
  };

  const children = (
    <>
      <p>{"Sign-in provider: " + user?.providerId}</p>
      <p>{"Provider-specific UID: " + user?.uid}</p>
      <p>{"Name: " + user?.displayName}</p>
      <p>{"Email: " + user?.email}</p>
      <div className="flex gap-2">
        PHOTO URL:
        {user?.photoURL ? (
          <a
            href={`${user?.photoURL}`}
            target="_blank"
            className="text-blue-300"
          >
            {`${user?.photoURL?.substring(0, 40)}.....`}
          </a>
        ) : (
          <span> "upload image url"</span>
        )}
      </div>
      <div className="flex gap-5">
        Email Verified --{" "}
        {user?.emailVerified === true ? (
          "true"
        ) : (
          <>
            {!click ? (
              <button
                className="bg-gray-500 rounded-sm px-10 text-sm"
                onClick={handleEmailVerification}
              >
                verify
              </button>
            ) : (
              <p className="text-red-500">Check your mail for confirmation</p>
            )}
          </>
        )}
      </div>
      <p>Signed up time : {user?.metadata?.creationTime} </p>
      <p>Last login time was : {user?.metadata?.lastSignInTime} </p>
    </>
  );

  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShow(true)}
        className="py-3 flex items-center justify-center gap-2"
      >
        Check User Information
        <>
          <FaUserAlt size={12} />
        </>
      </button>

      <button
        className="py-3 flex items-center justify-center gap-2"
        onClick={() => setShowModal(true)}
      >
        Update Profile
        <>
          <FaUserAlt size={12} />
        </>
      </button>

      <Link to="/change-password" className="flex gap-3 items-center">
        Change your password <MdWifiPassword />
      </Link>

      <InfoModal show={show} setShow={setShow} children={children} />

      <UpdateUserFormModal
        showModal={showModal}
        setShowModal={setShowModal}
        successMessage="Update Completed"
      />
      <Outlet />
    </div>
  );
};

type InfoType = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactElement;
};

export const InfoModal = ({ show, setShow, children }: InfoType) => {
  return (
    <>
      <Backdrop />
      <Modal show={show} close={() => setShow(false)} children={children} />
    </>
  );
};
