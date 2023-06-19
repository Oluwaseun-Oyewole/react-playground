import classNames from "classnames";
import chunk from "lodash/chunk";
import { useNavigate, useParams } from "react-router";
import { useDarkMode } from "usehooks-ts";
import { Button } from "../../components/atom/button";
import { useFetch } from "../../hooks/useFetch";

export const Comments = () => {
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();
  const navigate = useNavigate();

  const { status, data } = useFetch<any>(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  const dt = chunk(data, 3);

  return (
    <div className={classNames("font-light")}>
      <section>
        <p> status -- {status}</p>
        <p> Comment For Post {id}</p>
        <p>Total comments - {data?.length}</p>
      </section>
      <section>
        <div className="flex text-sm">
          {chunk(dt.slice(0, 8), 4)?.map((value) => {
            return (
              <div>
                {value.map((el, id) => {
                  return (
                    <div key={id} className="flex gap-5 ">
                      {el.map((e: any, i) => {
                        return (
                          <div
                            className={`${
                              isDarkMode ? "bg-gray-700" : "bg-dark"
                            } my-2 py-14 px-10`}
                          >
                            <p className="text-green-300 ">Name : {e.name}</p>
                            <p className="text-green-500 py-1">
                              Email : {e.email}
                            </p>
                            <p> {e.body}</p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="w-3/12">
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
