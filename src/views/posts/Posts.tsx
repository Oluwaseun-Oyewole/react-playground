import { Link, Outlet, useParams } from "react-router-dom";
import { z } from "zod";
import { useFetch } from "../../hooks/useFetch";
import { PostSchema } from "../../model/Posts";

const PostsArray = z.array(PostSchema);
type PostsSchemaType = z.infer<typeof PostsArray>;

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

  const { id } = useParams();

  return !id ? (
    <div>
      <h1>State Status -- {status}</h1>
      <p>{error?.message && error.message}</p>
      <div>
        {data?.map((el, i) => {
          return (
            <Link to={`${el.id}`} key={i} className="flex gap-2 items-center">
              {" "}
              <small>{el.id}</small>
              <p className="font-light block hover:bg-gray-500 hover:py-2 transition-all ease-in-out">{`${el.title.slice(
                0,
                50
              )}...`}</p>
            </Link>
          );
        })}
      </div>
    </div>
  ) : (
    <Outlet />
  );
};
