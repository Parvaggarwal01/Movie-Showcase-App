import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asynccloadmovie, removemovie } from "../store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "../components/templates/HorizontalCards";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asynccloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  return info ? (
    <div style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original/${
        info.details.backdrop_path || info.details.profile_path
      })`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      // filter: "blur(4px)",
    }} className="relative h-[155vh] w-screen px-[5%] ">
      {/* <div
        
        className="absolute inset-0 z-0"
      ></div> */}

      <div className=" text-zinc-100">
        <nav className="h-[10vh] w-full flex gap-10 text-2xl items-center">
          <Link
            onClick={() => navigate(-1)}
            className="hover:text-[#aed6dc] ri-arrow-left-line"
          ></Link>
          <a target="_blank" href={info.details.homepage}>
            <i className="hover:text-[#aed6dc] ri-external-link-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="hover:text-[#aed6dc] ri-earth-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
            className="hover:text-[#aed6dc]"
          >
            IMDB
          </a>
        </nav>

        <div className="w-full  flex">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[55vh] object-cover "
            src={`https://image.tmdb.org/t/p/original/${
              info.details.poster_path || info.details.backdrop_path
            }`}
            alt=""
          />

          <div className="content ml-[5%]">
            <h1 className="text-5xl font-black text-white">
              {info.details.name ||
                info.details.title ||
                info.details.original_name ||
                info.details.original_title}
              <small className="text-2xl font-bold text-zinc-300">
                ({info.details.release_date.split("-")[0]})
              </small>
            </h1>

            <div className="flex items-center gap-x-5 mt-7 mb-7">
              <span className="text-sm bg-yellow-600  font-semibold rounded-full text-white w-[5vh] h-[5vh] flex justify-center items-center">
                {(info.details.vote_average * 10).toFixed()} <sup>%</sup>
              </span>
              <h1 className="font-semibold text-xl w-[60px] leading-5">
                User Score
              </h1>
              <h1>{info.details.release_date}</h1>
              <h1>{info.details.genres.map((g) => g.name).join(", ")}</h1>
              <h1>{info.details.runtime} min</h1>
            </div>

            <h1 className="mb-7 text-xl font-semibold italic text-zinc-200">
              {info.details.tagline}
            </h1>

            <h1 className="text-lg text-semibold mb-2">Overview</h1>
            <p className="mb-9 text-sm font-semibold text-zinc-200">
              {info.details.overview}
            </p>

            <Link
              className="bg-[#aed6dc] p-4  rounded text-[#4a536b] font-semibold "
              to={`${pathname}/trailer`}
            >
              <i class="ri-play-fill"></i> Play Trailer
            </Link>
          </div>
        </div>
        <div className="w-[80%] mt-10 flex flex-col gap-y-5">
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex gap-x-10 items-center">
              <h1>Available on Platforms</h1>
              {info.watchproviders.flatrate.map((w) => (
                <img
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}

          {info.watchproviders && info.watchproviders.rent && (
            <div className="flex gap-x-10 items-center">
              <h1>Available for Rent</h1>
              {info.watchproviders.rent.map((w) => (
                <img
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}

          {info.watchproviders && info.watchproviders.buy && (
            <div className="flex gap-x-10 items-center">
              <h1>Available to Buy</h1>
              {info.watchproviders.buy.map((w) => (
                <img
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>

        <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-200" />
        <h1 className="text-3xl font-semibold text-white">
          Recommendations{" "}
        </h1>
        <HorizontalCards
          data={info.recommendations ? info.recommendations : info.similar}
        />

        <Outlet />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
