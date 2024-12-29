import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const People = () => {
  document.title = "Spotlight | Peoples";
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setpeople((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }

      console.log(data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refershHandler = async () => {
    if (people.length === 0) {
      GetPerson();
    } else {
      setpage(1);
      setpeople([]);
      GetPerson();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category]);

  return people.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="px-[5%] w-full flex items-center justify-between mb-7 ">
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#aed6dc] ri-arrow-left-line"
          ></i>{" "}
          Peoples
          {/* <small className="ml-2 text-sm text-zinc-500">({category})</small> */}
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <Cards data={people} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
