import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MainBoard from "./components/Mainboard";
import PinAndBoard from "./components/PinAndBoard";
import LoginHeader from "./components/LoginHeader";
import Login from "./components/Login";
import unsplash from "./api/unsplash";
import { Route, Switch } from "react-router-dom";

function App() {
  const [pins, setPins] = useState([]);
  const [pin, setPin] = useState([]);
  const [terms, setTerms] = useState([
    "luxury",
    "animals",
    "camping",
    "developer",
  ]);
  const getImages = (searchTerm) => {
    return unsplash.get("https://api.unsplash.com/search/photos/", {
      params: {
        query: searchTerm,
        per_page: 7,
        // page: 1
      },
    });
  };
  const loadImages = () => {
    let promises = [];
    let pinsData = [];
    terms.forEach((term) => {
      promises.push(
        getImages(term).then((result) => {
          let data = result.data.results;
          pinsData = [...pinsData, ...data];
          pinsData.sort(function (a, b) {
            return 0.5 - Math.random();
          });
        })
      );
    });
    Promise.all(promises).then(() => {
      setPins(pinsData);
    });
  };
  const handleSearch = (searchTerm) => {
    setPin([]);
    getImages(searchTerm).then((result) => {
      setPins(result.data.results);
      console.log("Handle Search Result:", result.data.results);
    });
  };
  const handleOpen = (singlePin) => {
    setPin(singlePin);
    setTerms(singlePin.tags.map((tag) => tag.title));
    loadImages();
    // window.scrollTo(0, 85);
  };
  const handleBack = () => {
    setPin([]);
    // eslint-disable-next-line no-restricted-globals
    history.back();
  };
  const handleHome = () => {
    setTerms([
      "cars",
      "nature",
      "beach",
      "wallpapers",
      "travel",
      "macbook",
      "camping",
    ]);
    console.log("Home Terms:", terms);
    loadImages();
  };
  useEffect(() => {
    loadImages();
  }, loadImages);
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Header onSearch={handleSearch} onHome={handleHome} />
          <MainBoard pins={pins} onOpen={handleOpen} />
        </Route>
        <Route path="/pin" render={PinAndBoard}>
          <Header onSearch={handleSearch} onHome={handleHome} />
          <PinAndBoard
            pin={pin}
            pins={pins}
            onBack={handleBack}
            onOpen={handleOpen}
            onTag={handleSearch}
          />
        </Route>
        <Route path="/login">
          <LoginHeader />
          <Login pins={pins} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
