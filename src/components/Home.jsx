import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "Spotlight | Homepage";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");
  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      //   console.log(data);

      let indexNumber = Math.floor(Math.random() * 20);
      //   console.log(indexNumber);

      let randomdata = data.results[indexNumber];
      //   console.log(r);

      setwallpaper(randomdata);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
        // console.log(data);
        
      settrending(data.results);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);

//   console.log(trending);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="flex justify-between p-4">
          <h1 className="text-3xl font-bold text-zinc-400 ">Trending</h1>
          <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e) => setcategory(e.target.value)} />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
