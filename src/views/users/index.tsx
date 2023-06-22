import { chunk } from "lodash";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useDarkMode } from "usehooks-ts";
import { z } from "zod";
import { UserSchemaWithGeo } from "../../model/User";

export const Users = () => {
  const UserResult = z.array(UserSchemaWithGeo);
  type UserArray = z.infer<typeof UserResult>;
  const [data, setData] = useState<UserArray>();
  const { isDarkMode } = useDarkMode();

  const fetchUsers = async (): Promise<UserArray | undefined> => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) return undefined;
      const userJson: UserArray = await res.json();
      const parsedData = UserResult.parse(userJson);
      console.log("pared data", parsedData);
      setData(parsedData);
      return parsedData;
    } catch (error) {
      if (error instanceof Error) console.log("Error While Fetching...", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const dt = chunk(data, 3);
  const { id } = useParams();

  return !id ? (
    <div>
      <div className="flex text-sm">
        {chunk(dt.slice(0, 8), 4)?.map((value) => {
          return (
            <div>
              {value.map((el, id) => {
                return (
                  <div
                    key={id}
                    className="text-sm flex-col md:flex-row flex gap-5"
                  >
                    {el.map((e: any, i) => {
                      return (
                        <Link to={`${e?.id}`}>
                          <div
                            className={`${
                              isDarkMode ? "bg-gray-900" : "bg-dark"
                            } my-2 py-10 px-10 hover:scale-90 transition-all ease-in-out duration-500 cursor-pointer`}
                          >
                            <p>Name : {e.name}</p>
                            <p>Username : {e.website}</p>
                            <p>Phone : {e.phone}</p>
                            <p className="text-green-500 py-1">
                              Email : {e.email}
                            </p>
                            <p> {e.body}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <Outlet />
  );
};
