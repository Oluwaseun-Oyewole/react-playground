import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { z } from "zod";
import { PaginatedItems } from "../../components/atom/Paginate";
import { useFetchContextProvider } from "../../context/fetch-context";
import { useFetch } from "../../hooks/useFetch";
import { PostSchema } from "../../model/Posts";

const PostsResults = z.array(PostSchema);

export interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const Posts = () => {
  const { status, data, error } = useFetch<PostInterface[]>(
    "http://jsonplaceholder.typicode.com/posts"
  );

  const { pathname } = useLocation();
  console.log("pathname", pathname);

  const itemsPerPage = 25;
  const { states } = useFetchContextProvider();
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems =
    pathname === "/dashboard/posts/"
      ? states?.data?.slice(itemOffset, endOffset)
      : states.data;
  const pageCount = Math.ceil(states?.data?.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % states?.data?.length;
    setItemOffset(newOffset);
  };

  const { id } = useParams();

  return !id ? (
    <div>
      <h1>State Status -- {status}</h1>
      <p>{error?.message && error.message}</p>
      {data && data.length && (
        <div>
          {currentItems?.map((el, i) => {
            return (
              <Link to={`${el.id}`} key={i} className="flex gap-2 items-center">
                <small>{el.id}</small>
                <p className="font-light block hover:bg-gray-500 hover:py-2 transition-all ease-in-out">{`${el.title.slice(
                  0,
                  50
                )}...`}</p>
              </Link>
            );
          })}
        </div>
      )}

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
    </div>
  ) : (
    <Outlet />
  );
};
