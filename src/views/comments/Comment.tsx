import classNames from "classnames";
import { collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import { useDarkMode } from "usehooks-ts";
import { Button } from "../../components/atom/button";
import { auth, db } from "../../config/firebase";
import { CreateCommentFormModal } from "./CreateCommentForm";

export const Comments = () => {
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formModal, setFormModal] = useState(false);

  const query = collection(db, `Posts/${id}/comments`);
  const [values, loading, error] = useCollectionData(query);

  const handleDeletePost = async (description: string) => {
    try {
      const postToDelete = doc(db, `/Posts/${id}/comments/${description}`);
      await deleteDoc(postToDelete);
      console.log("successful");
    } catch (error) {
      console.log("failed to delete");
    }
  };

  // tetsing..
  const [data, setData] = useState<{
    title?: string;
    body?: string;
    userId?: string;
  }>();
  const getSinglePost = async () => {
    try {
      const docRef = doc(db, `/Posts/${id}/comments/`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
        console.log("Completed");
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.log("Error");
    }
  };

  console.log("single comment", data);

  useEffect(() => {
    getSinglePost();
  }, []);

  return (
    <div className={classNames("font-light text-sm md:text-sm")}>
      <CreateCommentFormModal
        id={`${id}`}
        successMessage={`Comment Added`}
        showModal={formModal}
        setShowModal={setFormModal}
      />

      <section>
        <p> status -- {loading ? "Loading" : "Completed"}</p>
        {error && <p> Error status -- {error?.message}</p>}
        <p> Comment For Post {id}</p>
        <p>Total comments - {values?.length}</p>
      </section>

      <div>
        <button
          className="text-green-500 flex items-center justify-center gap-1 py-3"
          onClick={() => setFormModal(true)}
        >
          Create New Posts <AiOutlinePlus size={15} />
        </button>
      </div>

      <section>
        <div>
          <div key={id} className=" text-sm grid grid-cols-3  gap-5 ">
            {values?.map((e: any, i) => {
              console.log("eee", e?.userId);

              return (
                <div
                  key={i}
                  className={`${
                    isDarkMode ? "bg-gray-700" : "bg-dark"
                  }  text-xs p-5`}
                >
                  <p className="w-[50%]">{e.description}</p>
                  {/* <p className="w-[50%]">{auth?.currentUser?.email}</p> */}
                  <div className="flex gap-2 my-4 w-1/2">
                    <Button
                      children="Delete"
                      className="bg-red-400"
                      onClick={() => handleDeletePost(e?.description)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="my-5 md:w-[32%]">
          <Button
            children="Go back"
            className="bg-gray-500"
            onClick={() => navigate("../")}
          />
        </div>
      </section>
    </div>
  );
};
