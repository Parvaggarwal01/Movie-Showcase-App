import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className="bg-[rgba(0,0,0,.9)] absolute z-10000 top-0 left-0 w-screen h-screen flex flex-col gap-7 items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="hover:text-[#aed6dc] text-4xl ri-close-fill mt-3"
      ></Link>
      {ytvideo ? (<ReactPlayer
        height={550}
        width={1000}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      />) : (<NotFound />)}
    </div>
  );
};

export default Trailer;
