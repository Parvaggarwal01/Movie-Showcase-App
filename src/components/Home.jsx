import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import Header from "./templates/Header";

const Home = () => {
  document.title = "Spotlight | Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [loading, setLoading] = useState(true);

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get('/trending/all/day');
      const indexNumber = Math.min(
        Math.floor(Math.random() * 20),
        data.results.length - 1
      );

      setWallpaper(data.results[indexNumber]);
    } catch (err) {
      console.error("Error fetching wallpaper:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetHeaderWallpaper();
  }, []);

  return (
    <>
      <Sidenav />
      <div className="w-[80%] h-full">
        <Topnav />
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p>Loading...</p>
          </div>
        ) : (
          <Header data={wallpaper} />
        )}
      </div>
    </>
  );
};

export default Home;
