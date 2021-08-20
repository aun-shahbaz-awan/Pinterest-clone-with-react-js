import React, {useEffect, useState} from "react";
import './App.css';
import Header from "./components/Header";
import MainBoard from "./components/Mainboard";
import unsplash from "./api/unsplash";

function App() {
    const [pins, setPins] = useState([  ]);
    const getImages = searchTerm =>{
        return unsplash.get("https://api.unsplash.com/search/photos/",{
            params:{
                query: searchTerm,
                per_page: 15
            }
        })
    }
    const loadImages = () =>{
        let promises = [];
        let pinsData = [];
        let terms = ["cars", "nature", "beach", "wallpapers","models"]
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
    const handleHome = () =>{
        loadImages();
    }
    useEffect( () => {
        loadImages();
    },loadImages);
    return (
        <div className="App">
            <Header onSearch={handleSearch} onHome={handleHome}/>
            <MainBoard pins={pins}/>
        </div>
    );
}

export default App;
