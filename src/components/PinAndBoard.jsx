import React from 'react';
import PinView from "./PinView";
import MainBoard from "./Mainboard";

const PinAndBoard = ({pin, onBack, onTag, pins, onOpen}) => {
    return (
        <div>
            { pin.length === 0 ?"": <PinView pin={pin} onBack={onBack} onTag={onTag}/>}
            <MainBoard pins={pins} onOpen={onOpen}/>
        </div>
    );
};

export default PinAndBoard;