import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap w-full h-full px-[3%] justify-between bg-[#4a536b]">
      {data.map((d, i) => (
        <Link className="w-[26vh] mr-[5%] mb-[5%]" key={i}>
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              d.poster_path || d.backdrop_path || d.profile_path
            }`}
            alt=""
          />
          <h1 className="text-lg text-zinc-100 mt-3 font-semibold">
            {d.name || d.title || d.original_name || d.original_title}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
