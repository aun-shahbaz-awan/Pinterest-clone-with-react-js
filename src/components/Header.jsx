import React, {useState} from 'react';
import {IconButton} from "@material-ui/core";
import {Pinterest, Search, Notifications, Message, AccountCircle, ArrowDropDown } from "@material-ui/icons";
import styled from "styled-components";

const Header = ({onSearch, onHome}) => {
    const [search, setSearch] = useState("");
    function handleSearch(event){
        event.preventDefault();
        onSearch(search);
        setSearch("");
    }
    return (
        <div>
            <Wrapper>
                <LogoWrapper>
                    <IconButton>
                        <Pinterest/>
                    </IconButton>
                </LogoWrapper>
                <HomeButtonWrapper>
                    <span onClick={onHome}> Home </span>
                </HomeButtonWrapper>
                <SearchWrapper>
                    <SearchBarWrapper>
                        <IconButton>
                            <Search/>
                        </IconButton>
                        <form>
                            <input value={search} type="text" onChange={ (event) => setSearch( event.target.value )} />
                            <button type="submit" onClick={ handleSearch }></button>
                        </form>
                    </SearchBarWrapper>
                </SearchWrapper>
                <IconsWrapper>
                    <IconButton> <Notifications/> </IconButton>
                    <IconButton> <Message/> </IconButton>
                    <IconButton> <AccountCircle/> </IconButton>
                    <IconButton> <ArrowDropDown/> </IconButton>
                </IconsWrapper>
            </Wrapper>
        </div>
    );
};
export default Header;

const Wrapper = styled.div`
    display:flex;
    align-items: center;
    height:56px;
    padding: 12px 4px 12px 16px;
    background: white;
    color:black;
    -webkit-box-shadow: 0 5px 6px -6px #777;
    -moz-box-shadow: 0 5px 6px -6px #777;
    box-shadow: 0 5px 6px -6px #777;
`
const LogoWrapper = styled.div`
    .MuiSvgIcon-root{
        color:#E60023;
        font-size: 32px;
    }
`
const HomeButtonWrapper = styled.div`
    display: flex;
    height: 40px;
    min-width: 80px;
    justify-content:center;
    align-items: center;
    border-radius:25px;
    background:black;
    color:white;
    cursor:pointer;
    a{
        text-decoration:none;
        color:white;
        font-weight: 700;
    }
`
const SearchWrapper = styled.div`
    flex:1
`
const SearchBarWrapper = styled.div`
    display: flex;
    background:#EFEFEF;
    height:48px;
    border-radius:50px;
    margin:0 10px;
    form {
        display:flex;
        flex: 1;
    }
    form > input{
        width: 100%;
        background: transparent;
        font-size: 17px;
        font-weight: 700;
        border: none;
    }
    input:focus{
        outline: none;
    }
    form > button{
        display:none;
    }
`
const IconsWrapper = styled.div`

`

