import React from 'react';
import styled from "styled-components";
import {MoreHoriz, Share, ExpandMore, ArrowBack} from "@material-ui/icons";
import {IconButton, Tab, Antstap} from "@material-ui/core";
import {Link} from "react-router-dom";

const SinglePin = ({pin, onBack, onTag}) => {
    return (
        <Wrapper>
            <Container>
                <BackButtonWrapper onClick={onBack}>
                    <IconButton> <ArrowBack/> </IconButton>
                </BackButtonWrapper>

                <img src={pin.urls.small} alt="Single Pin"/>
                <section>
                    {/*Follow*/}
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
                    <TagsWrapper>
                            { pin.tags.map( tag =>
                                <div onClick={ () =>{ onTag(tag.title) }}>
                                    <h5> {tag.title} </h5>
                                </div>
                            )}
                    </TagsWrapper>
                </section>
            </Container>
        </Wrapper>
    );
};
export default SinglePin;

const Wrapper = styled.div`
    margin: 2rem 11rem;
    @media (max-width: 1300px) {
        margin: 2rem 9rem;
    }
    @media (max-width: 1100px) {
        margin: 2rem 7rem;
    }
    @media (max-width: 900px) {
        margin: 2rem 5rem;
    }
    @media (max-width: 600px) {
        margin: 2rem 2rem;
    }
    @media (max-width: 400px) {
        margin: 2rem 1rem;
    }
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
    display: flex;
    @media (max-width: 800px) {
        flex-direction: column;
    }
    padding: 1rem;
    img{
        width:50%;
        @media (max-width: 800px) {
            width: 100%;
        }
        border-radius: 25px;
        object-fit: cover;
    }
    section{
        width:50%;
        padding:2rem 1rem 2rem 2rem;
        @media (max-width: 1100px) {
            padding: 1rem 0.5rem 1rem 1rem;
        }
        @media (max-width: 800px) {
            width: 100%;
            padding: 1rem 0;
        }
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
const ButtonWrapper = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    border-radius:25px;
    cursor:pointer;
    font-weight: 700;
    a{
        text-decoration:none;  
    }
`
const SaveButtonWrapper = styled(ButtonWrapper)`
    height: 35px;
    width: 60px;
    background:#E60023;
    color:white;
    a{
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
const FollowButtonWrapper = styled(ButtonWrapper)`
    height: inheritance;
    width: 100px;
    background:#D3D3D3;
    color:#000;
    a{
        color:#000;
    }
`
const TabsWrapper = styled.div`

`
const TagsWrapper = styled.div`
    display:flex;
    padding:1rem 0;
    div{
        margin-right: 5px;
        color: #666666;
        border:1px solid #D3D3D3;
        border-radius: 25px;
        cursor:pointer;
    }
    div:hover{
        color: #E60023;
        border:1px solid #E60023;
    }
    h5{
        padding: 2px 7px 3px 7px;
    }
`