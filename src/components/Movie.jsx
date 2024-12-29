import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const Movie = () => {
  document.title = "Spotlight | Movies ";
  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setmovie((prevState) => [...prevState, ...data.results]);
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
    if (movie.length === 0) {
      GetMovie();
    } else {
      setpage(1);
      setmovie([]);
      GetMovie();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category]);

  return movie.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="px-[5%] w-full flex items-center justify-between mb-7 ">
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#aed6dc] ri-arrow-left-line"
          ></i>{" "}
          Movies<small className="ml-2 text-sm text-zinc-500">({category})</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
