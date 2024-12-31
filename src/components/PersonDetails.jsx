import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asynccloadmovie, removemovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "../components/templates/HorizontalCards";
import { removeperson } from "../store/reducers/personSlice";
import { asynccloadperson } from "../store/actions/personActions";
const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asynccloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);
  return info ? (
    <div className="px-[5%] w-screen flex h-[170vh] bg-[#4a536b] flex-col ">
      <nav className="h-[10vh] w-full flex gap-10 text-2xl items-center">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#aed6dc] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex ">
        <div className="w-[25%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              info.details.profile_path || info.details.backdrop_path
            }`}
            alt=""
          />
          <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-200" />
          <div className="text-2xl text-white flex gap-x-5 item-center justify-center ">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="hover:text-[#aed6dc] ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="hover:text-[#aed6dc] ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="hover:text-[#aed6dc] ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="hover:text-[#aed6dc] ri-twitter-x-fill"></i>
            </a>
          </div>
          <hr className="mt-5 mb-5 border-none h-[1px] bg-zinc-200" />

          <h1 className="text-2xl  font-semibold text-white my-5">
            Personal Info
          </h1>
          <h1 className="text-md  font-semibold text-zinc-300 my-5">{`Known For:  ${info.details.known_for_department}`}</h1>
          <h1 className="text-md  font-semibold text-zinc-300 my-5">{`Gender:  ${
            info.details.gender === 2 ? "Male" : "Female"
          }`}</h1>
          <h1 className="text-md  font-semibold text-zinc-300 my-5">{`Birthday:  ${info.details.birthday}`}</h1>
          <h1 className="text-md  font-semibold text-zinc-300 my-5">{`Deathday:  ${
            info.details.deathday ? info.details.deathday : "Alive"
          }`}</h1>
          <h1 className="text-md  font-semibold text-zinc-300 my-5">{`Place of Birth:  ${info.details.place_of_birth}`}</h1>
          <h1 className="text-md  font-semibold text-zinc-300 my-5">{`Also Known As:  ${info.details.also_known_as.join()}`}</h1>
        </div>

        <div className="w-[75%] ml-[5%]">
          <h1 className="text-6xl font-black text-white my-5">
            {info.details.name}
          </h1>
          <h1 className="text-xl font-black text-white">Biography</h1>
          <p className=" text-white mt-3">{info.details.biography}</p>
          <h1 className="text-lg font-black text-white mt-5 mb-5">Movies & Tv Shows</h1>
          <HorizontalCards data={info.combinedCredits.cast}/>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
