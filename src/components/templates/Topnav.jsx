import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      console.log(data.results);
      setsearches(data.results);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative flex justify-start items-center ml-[20%]">
      <i className="text-2xl text-zinc-400 ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="Search Anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-2xl text-zinc-400 ri-close-fill"
        ></i>
      )}

      <div className="absolute w-[50%]  max-h-[50vh]  top-[90%] overflow-auto rounded-lg ">
        {searches.map((s, i) => (
          <Link
            key={i}
            className="text-zinc-400 hover:text-[#4a536b] hover:bg-[#aed6dc] duration-300 font-semibold inline-block w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100"
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded mr-6 shadow-lg"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span >
              {s.name || s.title || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
