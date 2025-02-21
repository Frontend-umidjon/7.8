import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { SuspenseContainer } from "../utils";
const Home = lazy(() => import("../pages/home/Home"));
const Movie = lazy(() => import("../pages/movie/Movie"));
const Layout = lazy(() => import("../pages/layout/Layout"));
const Detail = lazy(() => import("../pages/detail/Detail"));
const Saved = lazy(() => import("../pages/saved/Saved"));
const Search = lazy(() => import("../pages/search/Search"));

const RouterMain = () => {
  return (
    <div className="dark:bg-black dark:text-white">
      <Routes>
        <Route
          path="/"
          element={
            <SuspenseContainer>
              <Layout />
            </SuspenseContainer>
          }
        >
          <Route
            path="/"
            element={
              <SuspenseContainer>
                <Home />
              </SuspenseContainer>
            }
          />
          <Route
            path="movie"
            element={
              <SuspenseContainer>
                <Movie />
              </SuspenseContainer>
            }
          />
          <Route
            path="saved"
            element={
              <SuspenseContainer>
                <Saved />
              </SuspenseContainer>
            }
          />
          <Route
            path="search"
            element={
              <SuspenseContainer>
                <Search />
              </SuspenseContainer>
            }
          />
          <Route
            path="movie/:id"
            element={
              <SuspenseContainer>
                <Detail />
              </SuspenseContainer>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default RouterMain;
