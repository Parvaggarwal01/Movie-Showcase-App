import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";

const Cards = ({ data, title }) => {
  console.log(title);

  return (
    <div className="flex flex-wrap w-full h-full px-[3%] justify-between bg-[#4a536b]">
      {data.map((d, i) => (
        <Link
          to={`/${d.media_type || title}/details/${d.id}`}
          className="relative w-[26vh] mr-[5%] mb-[5%]"
          key={i}
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover"
            src={d.poster_path || d.backdrop_path || d.profile_path ? `https://image.tmdb.org/t/p/original/${
              d.poster_path || d.backdrop_path || d.profile_path
            }` : noimage}
            alt=""
          />
          <h1 className="text-lg text-zinc-100 mt-3 font-semibold">
            {d.name || d.title || d.original_name || d.original_title}
          </h1>
          {d.vote_average && (
            <div className="absolute right-[-10%] bottom-[25%] bg-yellow-600 text-lg font-semibold rounded-full text-white w-[7vh] h-[7vh] flex justify-center items-center">
              {(d.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
