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
        const { data } = await axios.get('/trending/all/day');
        // Ensure the random number is between 0 and 20
        let indexNumber = Math.floor(Math.random() * 20); // Generates 0 to 20 (inclusive)

        if (indexNumber >= data.results.length) {
            indexNumber = data.results.length - 1; // Fallback to avoid out-of-bound errors
        }

        let randomdata = data.results[indexNumber];
        setwallpaper(randomdata);
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
