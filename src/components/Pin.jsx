import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const Pin = ({pin, url, onOpen}) => {
    return (
        <Wrapper>
            <Container>
                <Link to="/pin">
                    <img key={pin.id} src={url} alt="pin" onClick={ () => onOpen(pin)}/>
                </Link>
            </Container>
        </Wrapper>
    );
};
export default Pin
const Container = styled.div`
    height: 100%;
`
const Wrapper = styled.div`
    margin: 5px;
    display: flex;
    cursor: zoom-in;
    img{
        width: 100%;
        border-radius:20px;
    }
`