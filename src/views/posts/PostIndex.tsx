import classNames from "classnames";
import { collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BsForward } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { Outlet, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import RandomImages from "../../components/UI/RandomImages";
import { FormModal } from "../../components/UI/modal/FormModal";
import PromptModal from "../../components/UI/modal/PromptModal";
import { Button } from "../../components/atom/button";
import { auth, db } from "../../config/firebase";

export const PostIndex = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<{
    title?: string;
    body?: string;
    userId?: string;
  }>();
  const [status, setStatus] = useState("idle");

  const getSinglePost = async () => {
    try {
      setStatus("Loading..");
      const docRef = doc(db, "Posts", `${id}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
        setStatus("Completed");
      } else {
        setStatus("No such document");
      }
    } catch (error) {
      setStatus("Error");
    }
  };

  useEffect(() => {
    getSinglePost();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [formModal, setFormModal] = useState(false);

  const handleDeletePost = async () => {
    try {
      setStatus("Deleting..");
      const postToDelete = doc(db, "Posts", `${id}`);
      await deleteDoc(postToDelete);
      navigate("/posts");
      setStatus("Deleted");
    } catch (error) {
      setStatus("Deletion Failed");
      console.log("failed to delete");
    }
  };

  return (
    <div className={classNames("font-light")}>
      <FormModal
        successMessage={`Post Updated successfully`}
        showModal={formModal}
        setShowModal={setFormModal}
        title={data?.title}
        body={data?.body}
        userId={data?.userId}
        id={`${id}`}
        post={getSinglePost}
      />
      <PromptModal
        successMessage="Post deleted"
        promptMessage={`Would you like to delete this post? `}
        showModal={showModal}
        setShowModal={setShowModal}
        handler={handleDeletePost}
        id={`${id}`}
        title={`${data?.title}`}
        buttonText="Yes"
        userId={data?.userId}
      />

      <>
        <h2 className=" text-sm md:text-base">Current Post ID --- {id}</h2>
        <p className={classNames("py-2")}>Current Status --- {status}</p>
        <div className="flex-col md:flex-row md:items-center flex gap-10 h-[500px]">
          <div className={classNames("md:w-1/2")}>
            <div className="py-5">
              <p className={classNames("text-green-300 text-xl")}>
                Title -- {data?.title || "...."}"
              </p>
              <p className="py-2 text-sm tracking-wide text-lg">
                body : {data?.body || "...."}
              </p>
              <div className={classNames("flex gap-2")}>
                <FiEdit
                  className={classNames("text-green-500 hover:cursor-pointer")}
                  onClick={() => {
                    setFormModal(true);
                  }}
                />
                <MdOutlineDelete
                  className={classNames("text-red-500 cursor-pointer")}
                  onClick={() => {
                    setShowModal(true);
                  }}
                />
              </div>
              <div className="mt-2">
                <Link to={`comments/${id}`} className="flex gap-2 items-center">
                  Comments <BsForward />
                </Link>
              </div>
            </div>

            <div className="flex gap-5">
              <Button onClick={() => navigate("../")}>Go Back To Post </Button>
            </div>
          </div>

          <div className={classNames("md:w-1/2")}>
            <RandomImages />
          </div>
        </div>
      </>
      <Outlet />
    </div>
  );
};
