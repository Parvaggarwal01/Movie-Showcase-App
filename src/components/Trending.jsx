import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import { useState } from "react";
import Cards from "./templates/Cards";
import Loading from "./Loading";

const Trending = () => {
  document.title = "Spotlight | Trending ";
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}`);

      settrending(data.results);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  console.log(trending);

  useEffect(() => {
    GetTrending();
  }, [category, duration]);

  const navigate = useNavigate();
  return trending ? (
    <div className="w-screen h-screen overflow-hidden overflow-y-auto p-[1.2%] px-[3%]">
      <div className="w-full flex items-center justify-between mb-7 ">
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#aed6dc] ri-arrow-left-line"
          ></i>{" "}
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      <Cards  data={trending} title={category}/>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
