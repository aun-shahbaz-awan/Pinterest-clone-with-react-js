import React from 'react';
import {Pinterest} from "@material-ui/icons";
import styled from "styled-components";

const LoginHeader = () => {
    const scrollDown = () =>{
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
    return (
        <ThemeProvider>
            <Wrapper>
                <LeftWrapper>
                    <LogoWrapper>
                        <Pinterest/>
                    </LogoWrapper>
                    <h3>Pinterest</h3>
                </LeftWrapper>
                <RightWrapper>
                    <LinksWrapper>
                        <ul>
                            <li>About</li>
                            <li>Business</li>
                            <li>Blog</li>
                        </ul>
                    </LinksWrapper>
                    <LoginButtonWrapper>
                        <span onClick={ scrollDown }> Login </span>
                    </LoginButtonWrapper>
                    <SignUpButtonWrapper>
                        <span onClick={ scrollDown }> Sign up </span>
                    </SignUpButtonWrapper>
                </RightWrapper>
            </Wrapper>
        </ThemeProvider>

    );
};
export default LoginHeader;

const ThemeProvider = styled.div`

`
const Wrapper = styled.div`
    z-index: 100;
    display:flex;
    align-items: center;
    justify-content:space-between;
    height:56px;
    padding: 12px 0;
    width: 100%;
    background: white;
    color:black;
`
const LeftWrapper = styled.div`
    padding-left:16px;
    display:flex;
    align-items:center;
    h3{
        color:#E60023;
    }
`
const LogoWrapper = styled.div`
    display:flex;
    .MuiSvgIcon-root{
        color:#E60023;
        font-size: 32px;
    }
`
const RightWrapper = styled.div`
    display:flex;
    padding-right:16px;
`
const LinksWrapper = styled.div`
    display:flex;
    align-items:center;
    ul{
        list-style:none;
        
    }
    li{
        display:inline;
        padding-right:16px;
        font-weight:700;
    }
`
const ButtonWrapper = styled.div`
    display: flex;
    height: 38px;
    padding:0 16px;
    justify-content:center;
    align-items: center;
    border-radius:25px;
    cursor:pointer;
    font-weight:700;
    a{
        text-decoration:none;
        font-weight: 700;
    }
`
const LoginButtonWrapper = styled(ButtonWrapper)`
    margin-right:10px;
    background:#E60023;
    color:white;
    cursor:pointer;
    a{
        color:white;
    }
`
const SignUpButtonWrapper = styled(ButtonWrapper)`
    background:#EFEFEF;
    color:#000;
    cursor:pointer;
    a{
        color:white;
    }
`


