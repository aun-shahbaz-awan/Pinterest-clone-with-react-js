import React from 'react';
import styled from "styled-components";
import {MoreHoriz, Share, ExpandMore, ArrowBack} from "@material-ui/icons";
import {IconButton, Tab, Antstap} from "@material-ui/core";
import {Link} from "react-router-dom";

const SinglePin = ({pin, onBack}) => {
    return (
        <Wrapper>
            <Container>
                <BackButtonWrapper onClick={onBack}>
                    <IconButton> <ArrowBack/> </IconButton>
                </BackButtonWrapper>

                <img src={pin.urls.small} alt="Single Pin"/>
                <section>
                    <header>
                        <IconWrapper>
                            <IconButton> <MoreHoriz/> </IconButton>
                            <IconButton> <Share/> </IconButton>
                        </IconWrapper>
                        <span>
                            <h4>Playlist <ExpandMore/></h4>
                            <SaveButtonWrapper>
                                <span>Save</span>
                            </SaveButtonWrapper>
                        </span>
                    </header>
                    <a href={pin.user.portfolio_url}>Portfolio</a>
                    <br/>
                    <h1>{pin.description == null?"*No Title*": pin.description}</h1>
                    <br/>
                    <p>{pin.alt_description}</p>
                    {/*Follow*/}
                    <FollowWrapper>
                            <FollowDetailWrapper>
                                <img src={pin.user.profile_image.large} alt="Single Pin"/>
                                <FollowUser>
                                    <span>
                                        <h5>{pin.user.first_name}</h5>
                                        <h5>{pin.user.total_likes} Likes</h5>
                                    </span>
                                </FollowUser>
                            </FollowDetailWrapper>
                            <FollowButtonWrapper>
                                <span>Follow</span>
                            </FollowButtonWrapper>
                    </FollowWrapper>
                    {/*Tabs*/}
                    <TabsWrapper>

                    </TabsWrapper>
                    {/*Tags*/}
                    
                </section>
            </Container>
        </Wrapper>
    );
};
export default SinglePin;

const Wrapper = styled.div`
    margin: 2rem 11rem;
    border-radius: 25px;
    box-shadow:
      1px 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      2px 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
      3px 0 8.5px 7px rgba(0, 0, 0, 0.06),
      0 12.3px 10.9px rgba(0, 0, 0, 0.072),
      0 20.8px 15.4px rgba(0, 0, 0, 0.086),
      0 40px 30px rgba(0, 0, 0, 0.12) 
    ;   
`
const Container = styled.div`
    display:flex;
    padding: 1rem;
    img{
        border-radius: 25px;
        width:50%;
        object-fit: cover;
    }
    section{
        width:100%;
        padding: 2rem;
        header{
            display:flex;
            justify-content:space-between; 
            span{
                display:flex;
                align-items:center;
            }
        }
        h1{
            padding-top: 1rem;
        }
    }
`
const BackButtonWrapper = styled.div`
    .MuiSvgIcon-root{
        color:#000000;
        font-weight: bold;
    }
    position:fixed;
    top: 6rem;
    left: 2rem;
`
const IconWrapper = styled.div`
    .MuiSvgIcon-root{
        color:#000000;
        font-size: 26px;
    }
`
const SaveButtonWrapper = styled.div`
    display: flex;
    height: 35px;
    width: 60px;
    justify-content:center;
    align-items: center;
    border-radius:25px;
    background:#E60023;
    color:white;
    cursor:pointer;
    font-weight: 700;
    a{
        text-decoration:none;
        color:white;        
    }
`
const FollowWrapper = styled.div`
    margin-top:1rem;
    display:flex;
    justify-content: space-between;
`
const FollowDetailWrapper = styled.div`
    display:flex;
        img{
        border-radius:50%;
        width:3rem;
        height:3rem;
    }
`
const FollowUser = styled.div`
    display:flex;
    align-items:center;
    margin-left:1rem;
`
const FollowButtonWrapper = styled.div`
    display: flex;
    height: inheritance;
    width: 100px;
    justify-content:center;
    align-items: center;
    border-radius:25px;
    background:#D3D3D3;
    color:#000;
    font-weight: 700;
    cursor:pointer;
    a{
        text-decoration:none;
        color:#000;
    }
`
const TabsWrapper = styled.div`

`