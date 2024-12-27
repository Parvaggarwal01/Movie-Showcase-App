import axios from "../../utils/axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  

  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-400 p-8 overflow-auto">
      <h1 className="text-2xl text-white font-bold ">
        <i className="ri-tv-fill text-[#aed6dc] mr-2"></i>
        <span className="">Spotlight</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-2">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>
        <Link to="/trending" className="hover:bg-[#aed6dc] hover:text-[#4a536b] rounded-lg duration-300 p-4">
          <i className="mr-2 ri-fire-fill"></i> Trending
        </Link>
        <Link to="/popular" className="hover:bg-[#aed6dc] hover:text-[#4a536b] rounded-lg duration-300 p-4">
          <i className="mr-2 ri-bard-fill"></i> Popular
        </Link>
        <Link to="/movie" className="hover:bg-[#aed6dc] hover:text-[#4a536b] rounded-lg duration-300 p-4">
          <i className="mr-2 ri-movie-2-ai-fill"></i> Movies
        </Link>
        <Link to="/tvshows" className="hover:bg-[#aed6dc] hover:text-[#4a536b] rounded-lg duration-300 p-4">
          <i className="mr-2 ri-tv-2-fill"></i> Tv Shows
        </Link>
        <Link className="hover:bg-[#aed6dc] hover:text-[#4a536b] rounded-lg duration-300 p-4 mb-5">
          <i className="mr-2 ri-team-fill"></i> People
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400" />
      <nav className="flex flex-col text-zinc-400 text-xl gap-1">
        <h1 className="text-white font-semibold text-xl mt-5 mb-5">
          Website Information
        </h1>
        <Link className="hover:bg-[#aed6dc] hover:text-[#4a536b] rounded-lg duration-300 p-4">
          <i className="mr-2 ri-information-fill"></i> About Spotlight
        </Link>
        <Link className="hover:bg-[#aed6dc] hover:text-[#4a536b] rounded-lg duration-300 p-4">
          <i className="mr-2 ri-phone-fill"></i>Contact
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
