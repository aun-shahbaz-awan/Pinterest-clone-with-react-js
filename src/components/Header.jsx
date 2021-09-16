import React, {useEffect, useState} from 'react';
import {IconButton} from "@material-ui/core";
import {Pinterest, Search, Notifications, Message, AccountCircle, ArrowDropDown } from "@material-ui/icons";
import styled from "styled-components";

const Header = ({onSearch, onHome}) => {
    const [search, setSearch] = useState("");
    const [sticky, setSticky] = useState(false);

    function handleSearch(event){
        event.preventDefault();
        onSearch(search);
        setSearch("");
    }
    useEffect(() => {
        window.addEventListener('scroll',()=>{
            if(window.scrollY > 10)
                setSticky(true);
            else setSticky(false);
        });
        return () => { window.removeEventListener('scroll',() => {}) };
    },[]);
    return (
        <ThemeProvider>
            <Wrapper stick={{ show:sticky }}>
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
        </ThemeProvider>
    );
};
export default Header;

const ThemeProvider = styled.div`
    margin-bottom: 80px;
    width: 100%;
`
const Wrapper = styled.div`
    z-index: 100;
    display:flex;
    align-items: center;
    height:56px;
    padding: 12px 0;
    position:fixed;
    top:0;
    width: 100%;
    background: white;
    color:black;
    box-shadow:${ props => props.stick.show && '0 5px 6px -6px #777'};
    transition: all .2s;
`
const LogoWrapper = styled.div`
    padding-left:16px;
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
    flex:1;
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
    padding-right: 16px;
`

