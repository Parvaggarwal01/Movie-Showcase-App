import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import Header from "./templates/Header";

const Home = () => {
  document.title = "Spotlight | Homepage";
  const [wallpaper, setwallpaper] = useState(null);
  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
    //   console.log(data);
      
      let indexNumber = (Math.random()*data.results.length).toFixed();
    //   console.log(indexNumber);
      
      let randomdata = data.results[indexNumber];
    //   console.log(r);
      
      setwallpaper((randomdata));
    } catch (err) {
      console.log("Error: ", err);
    }
  };


//   console.log(wallpaper);   
  
  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
  }, []);


  return wallpaper ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full ">
        <Topnav />
        <Header data={wallpaper}/>
      </div>
    </>
  ) : <h1>Loading</h1>;
};

export default Home;
