import React from "react";

const Header = ({ data }) => {
//   console.log(data);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className="w-full h-[50vh]"
    >
      Header
    </div>
  );
};

export default Header;
