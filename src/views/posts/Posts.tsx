import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { Link, Outlet, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { CreateFormModal } from "./create-fom";

export interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const Posts = () => {
  const postCollections = collection(db, "Posts");

  const [posts, setPosts] = useState<any>([]);
  const [error, setError] = useState<any>({});
  const [status, setStatus] = useState("idle");

  const getAllPosts = async () => {
    setStatus("loading...");
    try {
      const data = await getDocs(postCollections);

      const filteredPosts = data?.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setPosts(filteredPosts);
      setStatus("completed");
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = posts?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(posts?.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % posts?.length;
    setItemOffset(newOffset);
  };

  const { id } = useParams();
  const [formModal, setFormModal] = useState(false);

  return !id ? (
    <div>
      <button
        className="text-green-500 flex items-center justify-center gap-1"
        onClick={() => setFormModal(true)}
      >
        Create New Posts <AiOutlinePlus size={15} />
      </button>

      <CreateFormModal
        successMessage={`New Post Added successfully`}
        showModal={formModal}
        setShowModal={setFormModal}
        setPosts={setPosts}
      />

      <h1 className="py-2"> Status -- {status}</h1>
      <p className="">{error?.message && error.message}</p>
      {posts && (
        <div>
          {currentItems?.map((el: any, i: number) => {
            return (
              <Link to={`${el.id}`} key={i} className="flex gap-2 items-center">
                <small className="hidden md:block">{i + 1}</small>
                <p className="font-light block hover:bg-gray-500  transition-all ease-in-out text-sm md:text-base py-1">{`${el?.title?.substring(
                  0,
                  30
                )}...`}</p>
                <p>{el.userId}</p>
              </Link>
            );
          })}
        </div>
      )}

      {posts?.length >= 10 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          activeLinkClassName="text-green-700 font-bold"
          className="controller bg-gray-800 flex items-center justify-center gap-5 py-2 my-4 text-xl"
        />
      )}
    </div>
  ) : (
    <Outlet />
  );
};
