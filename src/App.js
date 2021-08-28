import React, {useEffect, useState} from "react";
import './App.css';
import Header from "./components/Header";
import MainBoard from "./components/Mainboard";
import unsplash from "./api/unsplash";
import SinglePin from "./components/SinglePin";
import {Switch, Route} from "react-router-dom";

function App() {
    const [pins, setPins] = useState([  ]);
    const [pin,setPin] = useState([])
    const getImages = searchTerm =>{
        return unsplash.get("https://api.unsplash.com/search/photos/",{
            params:{
                query: searchTerm,
                per_page: 5
            }
        })
    }
    const loadImages = () =>{
        let promises = [];
        let pinsData = [];
        let terms = ["cars", "nature", "beach", "wallpapers","travel"]
        terms.forEach( term =>{
            promises.push(
                getImages(term).then( (result) => {
                    let data = result.data.results;
                    pinsData = [...pinsData,...data]
                    pinsData.sort(
                        function (a,b){
                            return 0.5 - Math.random();
                        }
                    )
                })
            )
        })
        Promise.all(promises).then( () => {
            setPins(pinsData);
            console.log("Handle Load Image Result:",pinsData)
        })
    }
    const handleSearch = searchTerm =>{
        getImages(searchTerm).then( (result) => {
            setPins( result.data.results );
            console.log("Handle Search Result:",result.data.results)
        })
    }
    const handleOpen = singlePin =>{
        console.log("This is pin:",singlePin)
        setPin(singlePin);
    };
    const handleBack = () =>{
        setPin([]);
    }
    const handleHome = () =>{
        loadImages();
    }
    useEffect( () => {
        loadImages();
    },loadImages);
    return (
        <div className="App">
            <Header onSearch={handleSearch} onHome={handleHome}/>
            {pin.length == ""?"":<SinglePin pin={pin} onBack={handleBack} onTag={handleSearch} />}
            <MainBoard pins={pins} onOpen={handleOpen}/>

            {/*<div className="content">*/}
            {/*    <Switch>*/}
            {/*        <Route path="/pin">*/}
            {/*            {pin.length == ""?"":<SinglePin pin={pin} onBack={handleBack} />}*/}
            {/*        </Route>*/}
            {/*        <Route exact path="/"><MainBoard pins={pins} onOpen={handleOpen}/></Route>*/}
            {/*    </Switch>*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
