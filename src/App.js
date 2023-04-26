import React from "react";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import { Routes, Route } from "react-router";
import CreateGame from "./components/create-game/create-game";
import PlayGame from "./components/play-game/play-game";
import {BrowserRouter} from "react-router-dom";
import createGameReducer from "./components/create-game/create-game-reducer";
import createChallengeReducer from "./components/challenge-screen/challenge-reducer"
import "./App.css"
import WelcomeScreen from "./components/home-screen/welcome-screen";
import Board from "./components/leader-board/leader-board";
import ProfileScreen from "./components/profile/profile-screen";
import Search from "./components/search/search-bar";
import Battle from "./components/challenge-screen/battle";
import Navigation from "./components/nav-bar/sidebar";
import CreateQuestion from "./components/create-question/create-question";
import {Login} from "./components/profile/login";
import Signup from "./components/sign-up/signup";
import FindCategoryInfo from "./components/category/find-category-info";
import VisitingProfile from "./components/profile/visiting-profile";
import EditProfile from "./components/profile/edit-profile";
import ChallengeScreenNavigation from "./components/challenge-screen/challenge-screen-nav";
import ChallengeScreenUser from "./components/challenge-screen/challenge-screen-user";
import ChallengeScreenCreateUser from "./components/challenge-screen/challenge-screen-create-user";
import AddGems from "./components/home-screen/add-gems";

const store = configureStore({
    reducer: {
        game: createGameReducer,
        challenge:createChallengeReducer
    }
})


function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <div className="App">
                  <div className="row mt-2">
                      <div className="col-xxs-1 col-sm-1 col-md-2 col-lg-1 col-xl-2">
                          <Navigation />
                      </div>
                      <div className="d-xs-none d-sm-block col-md-10 col-lg-9 col-xl-7 routes-container">

                          <Routes>

                              <Route path="/" element={<WelcomeScreen />} />
                              <Route path="/home" element={<WelcomeScreen />} />
                              <Route path="/login" element={<Login/>}/>
                              <Route path="/gems" element={<AddGems/>}/>
                              <Route path="/battle" element={<Battle/>}/>
                              <Route path="/trivia/challenge" element={<ChallengeScreenNavigation/>}/>
                              <Route path="challenge/user" element={<ChallengeScreenUser/>}/>
                              <Route path="challenge/create/user" element={<ChallengeScreenCreateUser/>}/>
                              <Route path="/edit" element={<EditProfile/>}/>
                              <Route path="trivia/category" element={<FindCategoryInfo/>}/>
                              <Route path="trivia/create" element={<CreateGame />} />
                              <Route path="trivia/customize" element={<CreateQuestion />} />
                              <Route path="trivia/play" element={<PlayGame />} />
                              <Route path="/profile" element={<ProfileScreen />} />
                              <Route path="/profile/:uid" element={<VisitingProfile />} />
                              <Route path="/signup" element={<Signup />} />
                          </Routes>
                      </div>
                      <div className="d-none d-md-block col-md-2 col-lg-3 col-xl-3 board">
                          <Board />
                      </div>
                  </div>
              </div>
          </BrowserRouter>
      </Provider>

  );
}
export default App;
