import React, {useEffect, useState} from "react";
import './App.css';
import Header from "./components/Header";
import MainBoard from "./components/Mainboard";
import unsplash from "./api/unsplash";
import PinAndBoard from "./components/PinAndBoard";
import { Route, Switch } from 'react-router-dom';

function App() {
    const [pins, setPins] = useState([  ]);
    const [pin,setPin] = useState([]);
    const [terms, setTerms] = useState(["cars", "nature", "beach", "wallpapers","travel","macbook","camping"]);
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
        setPin([]);
        getImages(searchTerm).then( (result) => {
            setPins( result.data.results );
            console.log("Handle Search Result:",result.data.results)
        })
    }
    const handleOpen = singlePin =>{
        setPin(singlePin);
        window.scrollTo(0, 85);
        setTerms( singlePin.tags.map( tag => tag.title) );
        loadImages();
    };
    const handleBack = () =>{
        setPin([]);
        // eslint-disable-next-line no-restricted-globals
        history.back();
    }
    const handleHome = () =>{
        setTerms(["cars", "nature", "beach", "wallpapers","travel","macbook","camping"]);
        console.log("Home Terms:",terms);
        loadImages();
    }
    useEffect( ()=>{
        loadImages();
    }, loadImages)
    return (
        <div className="App">
            {/*<Header onSearch={handleSearch} onHome={handleHome}/>*/}
            {/*{ pin.length == ""?"": <PinView pin={pin} onBack={handleBack} onTag={handleSearch}/>}*/}
            {/*<MainBoard pins={pins} onOpen={handleOpen}/>*/}

            <Header onSearch={handleSearch} onHome={handleHome}/>
            <Switch>
                <Route path="/" exact >
                    <MainBoard pins={pins} onOpen={handleOpen}/>
                </Route>
                <Route path="/pin" render={PinAndBoard}>
                    <PinAndBoard pin={pin} pins={pins}
                                 onBack={handleBack}
                                 onOpen={handleOpen}
                                 onTag={handleSearch}
                    />
                </Route>
            </Switch>
        </div>
    );
}

export default App;