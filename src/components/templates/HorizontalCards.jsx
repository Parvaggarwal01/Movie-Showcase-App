import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-[100%]  flex overflow-y-hidden mb-5 p-3">
      {data.map((d, i) => (
        <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="min-w-[18%] mr-5 mb-5 bg-[#2f3649]">
          <img
            className="w-full h-[45%]  object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              d.backdrop_path || d.profile_path
            }`}
            alt=""
          />
          <div className="text-white p-3 h-[55%]">
            <h1 className=" text-xl font-semibold ">
              {d.name || d.title || d.original_name || d.original_title}
            </h1>
            <p className="text-sm">
              {d.overview.slice(0, 100)}...{" "}
              <span className="cursor-pointer text-zinc-500">more</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;
