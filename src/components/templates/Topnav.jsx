import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi&query=${query}`);
      // console.log(data.results);
      setsearches(data.results);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[80%]   h-[10vh] relative flex m-auto   items-center ">
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
          className="cursor-pointer text-2xl text-zinc-400 ri-close-fill right-0"
        ></i>
      )}

      {query.length > 0 && (
        <div className="absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[7%] overflow-auto rounded-lg shadow-lg z-10">
          {searches.length > 0 ? (
            searches.map((s, i) => (
              <Link
                key={i}
                className="text-zinc-400 hover:text-[#4a536b] hover:bg-[#aed6dc] duration-300 font-semibold inline-block w-full px-4 py-3 flex justify-start items-center border-b border-zinc-100"
              >
                <img
                  className="w-[8vh] h-[8vh] object-cover rounded mr-4 shadow-lg"
                  src={
                    s.backdrop_path || s.profile_path
                      ? `https://image.tmdb.org/t/p/original/${
                          s.backdrop_path || s.profile_path
                        }`
                      : noimage
                  }
                  alt=""
                />
                <span className="truncate w-[80%] ">
                  {s.name || s.title || s.original_name || s.original_title}
                </span>
              </Link>
            ))
          ) : (
            <p className="text-zinc-400 text-center py-3">No Result Found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Topnav;
