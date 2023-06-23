import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, Outlet, useParams } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
// import { PostSchema } from "../../model/Posts";

// const PostsResults = z.array(PostSchema);

export interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const Posts = () => {
  const { status, error, data } = useFetch<PostInterface[]>(
    "http://jsonplaceholder.typicode.com/posts"
  );

  const itemsPerPage = 20;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(data?.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;
    setItemOffset(newOffset);
  };

  const { id } = useParams();

  return !id ? (
    <div>
      <h1>State Status -- {status}</h1>
      <p>{error?.message && error.message}</p>
      {data && (
        <div>
          {currentItems?.map((el: any, i: number) => {
            return (
              <Link to={`${el.id}`} key={i} className="flex gap-2 items-center">
                <small className="hidden md:block">{el.id}</small>
                <p className="font-light block hover:bg-gray-500  transition-all ease-in-out text-sm md:text-base">{`${el.title.slice(
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
