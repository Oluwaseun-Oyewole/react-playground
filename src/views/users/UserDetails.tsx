import classNames from "classnames";
import { useNavigate, useParams } from "react-router";
import RandomImages from "../../components/UI/RandomImages";
import { Button } from "../../components/atom/button";
import { useFetch } from "../../hooks/useFetch";

export const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { status, data } = useFetch<any>(
    `http://jsonplaceholder.typicode.com/users/${id}`
  );

  return (
    <div>
      {" "}
      <>
        <h2 className="text-sm md:text-2xl">Current Post ID is {id}</h2>
        <p className={classNames("py-2")}>Current Status --- {status}</p>
        <div className="flex-col md:flex-row md:items-center flex gap-10 md:h-[500px]">
          <div className={classNames("md:w-1/2")}>
            <div className="py-5">
              <p className={classNames("text-green-300 text-xl")}>
                User Info -- "{data?.name || "...."} {data?.email}"
              </p>
              <p className="py-2 text-sm tracking-wide">
                Phone -- {data?.phone || "...."} ,{data?.website || "...."}
              </p>
              <p className="py-2 text-sm tracking-wide">
                {data?.address?.city || "...."}-{data?.address?.street}
              </p>
              <p className="py-2 text-sm tracking-wide">
                {data?.company?.name || "...."}---{data?.company?.catchPhrase}
              </p>
            </div>

            <div className="flex gap-5">
              <Button onClick={() => navigate("../")}>Go Back To Users </Button>
            </div>
          </div>

          <div className={classNames("md:w-1/2")}>
            <RandomImages />
          </div>
        </div>
      </>
    </div>
  );
};
