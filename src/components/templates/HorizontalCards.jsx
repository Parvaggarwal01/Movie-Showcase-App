import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-[100%]  flex overflow-y-hidden mb-5 p-3">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[18%] mr-5 mb-5 bg-[#2f3649] h-[40vh]"
          >
            <img
              className="w-full h-[45%]  object-cover"
              src={d.backdrop_path || d.profile_path || d.poster_path ? `https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.profile_path || d.poster_path
              }` : noimage}
              alt=""
            />
            <div className="text-white p-3 h-[55%] overflow-y-auto">
              <h1 className=" text-xl font-semibold ">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className="text-sm">
                {d.overview.slice(0, 100)}...{" "}
                <span className="cursor-pointer text-zinc-500">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white font-black text-center mt-5">
          Nothing to Show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
