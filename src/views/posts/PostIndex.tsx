import classNames from "classnames";
import { BsForward } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { Outlet, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import RandomImages from "../../components/UI/RandomImages";
import { Button } from "../../components/atom/button";
import { useFetch } from "../../hooks/useFetch";
import { PostInterface } from "./Posts";

export const PostIndex = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { status, data } = useFetch<PostInterface>(
    `http://jsonplaceholder.typicode.com/posts/${id}`
  );

  return (
    <div className={classNames("font-light")}>
      <>
        <h2 className="text-2xl">Current Post ID is {id}</h2>
        <p className={classNames("py-2")}>Current Status --- {status}</p>
        <div className="items-center flex gap-10 h-[500px]">
          <div className={classNames("w-1/2")}>
            <div className="py-5">
              <p className={classNames("text-green-300 text-xl")}>
                Title -- "{data?.title}"
              </p>
              <p className="py-2 text-sm tracking-wide">{data?.body}</p>
              <div className={classNames("flex gap-2")}>
                <FiEdit
                  className={classNames("text-green-500 hover:cursor-pointer")}
                />
                <MdOutlineDelete
                  className={classNames("text-red-500 cursor-pointer")}
                />
              </div>
              <div className="mt-2">
                <Link to={`comments`} className="flex gap-2 items-center">
                  Comments <BsForward />
                </Link>
              </div>
            </div>
            <div className="flex gap-5">
              <Button onClick={() => navigate("../")}>Go Back To Post </Button>
            </div>
          </div>

          <div className={classNames("w-1/2")}>
            <RandomImages />
          </div>
        </div>
      </>
      <Outlet />
    </div>
  );
};
