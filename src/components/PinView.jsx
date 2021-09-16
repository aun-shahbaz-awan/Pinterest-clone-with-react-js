import React, {useEffect} from 'react';
import styled from "styled-components";
import {saveAs} from 'file-saver';
import {MoreHoriz, Share, ExpandMore, ArrowBack} from "@material-ui/icons";
import {IconButton, Menu, MenuItem, } from "@material-ui/core";

const PinView = ({pin, onBack, onTag}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event =>{
        anchorEl? setAnchorEl(null) : setAnchorEl(event.currentTarget);
    }
    const handleTab = (name) =>{
        let i = "", tabContent = "";
        tabContent = document.getElementsByClassName("tabContent");
        for (i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }
        document.getElementById(name).style.display = "block";
        if(name === 'PhotosTab'){
            document.getElementById('photos').classList.add('active');
            document.getElementById('comments').classList.remove('active');
        }
        else {
            document.getElementById('comments').classList.add('active');
            document.getElementById('photos').classList.remove('active');
        }
    }
    useEffect( () =>{
        document.getElementById('photos').click();
    },[]);
    return (
        <Wrapper>
            <Container>
                {/*Back Button*/}
                <BackButtonWrapper onClick={onBack}>
                    <IconButton> <ArrowBack/> </IconButton>
                </BackButtonWrapper>
                {/*Image*/}
                <img src={pin.urls.small} alt="Single Pin" onClick={ () => {window.open( pin.urls.full,'_blank')} }/>
                {/*Content*/}
                <section>
                    {/*Follow*/}
                    <header>
                        <IconWrapper>
                            <IconButton>
                                <MoreHoriz aria-controls="menu" aria-haspopup="true" onClick={handleClick} />
                                <Menu id="menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClick}>
                                    <MenuItem onClick={ () => { saveAs(pin.urls.small, pin.id.concat(".jpg")); handleClick() } }>Download image</MenuItem>
                                    <MenuItem>Hide Pin</MenuItem>
                                    <MenuItem>Report Pin</MenuItem>
                                    <MenuItem>Get Pin embed code</MenuItem>
                                </Menu>
                            </IconButton>
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
                        <TabHeader>
                            <div> <h4 id="photos" onClick={() => handleTab('PhotosTab')}>Photos</h4> </div>
                            <div> <h4 id="comments" onClick={() => handleTab('CommentsTab')}>Comments</h4> </div>
                        </TabHeader>
                        <TabBody>
                            <div id="PhotosTab" className="tabContent">
                                <PhotoTabWrapper>
                                    <div>
                                        <p>Tried this Pin?</p>
                                        <p>Add a photo to show how it went</p>
                                    </div>
                                    <AddButtonWrapper>
                                        <span>Add Photo</span>
                                    </AddButtonWrapper>
                                </PhotoTabWrapper>
                            </div>
                            <div id="CommentsTab" className="tabContent">
                                <p>Share feedback, ask a question or give a high five</p>
                                <CommentTabWrapper>
                                    <img src={pin.user.profile_image.large} alt="Single Pin"/>
                                    <CommentSearchBarWrapper>
                                        <form>
                                            <input type="text" placeholder="Add your Comment"/>
                                            <button type="submit">Done</button>
                                        </form>
                                    </CommentSearchBarWrapper>
                                </CommentTabWrapper>
                            </div>
                        </TabBody>
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
export default PinView;

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
    margin-top: 100px;
    display: flex;
    position: relative;
    @media (max-width: 800px) {
        flex-direction: column;
    }
    padding: 1rem;
    img{
        width:50%;
        @media (max-width: 800px) {
            width: 100%;
        }
        height:fit-content;
        border-radius: 25px;
        object-fit: cover;
        cursor: zoom-in;
    }
    section{
        width:50%;
        height: 100%;
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
    margin:1rem 0;
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
    margin-bottom: 2rem;
`
const TabHeader = styled.div`
    display:flex;
    h4{
        color: #777777;
        padding: 0.3rem 0;
    }
    div{
        margin-right: 1rem;
        cursor:pointer;
    }
    .active{
        color: #000;
        border-bottom: 3px solid #000;
    }
`
const TabBody = styled.div`
    padding-top: 1.5rem; 
    p { font-size: 0.7rem; }   
`
const PhotoTabWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    p { font-size: 0.8rem; }
`
const AddButtonWrapper = styled(ButtonWrapper)`
    height: inheritance;
    width: 112px;
    background:#ededed;
    color:#000;
    a{
        color:#000;
    }
`
const CommentTabWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    padding-top: 1.5rem;
    img{
        border-radius:50%;
        width:2.5rem;
        height:2.5rem;
    }
`
const CommentSearchBarWrapper =styled.div`
    display: flex;
    height:inherit;
    border-radius:50px;
    width: 100%;
    margin-left: 1rem;
    background:#EFEFEF;
    form {
        display:flex;
        flex: 1;
    }
    form > input{
        padding-left: 1rem;
        width: 100%;
        background: transparent;
        border: none;
        font-size: 15px;
        font-weight: 600;
    }
    input:focus{
        outline: none;
    }
    form > button{
        background:#D3D3D3;
        width: 90px;
        border: none;
        outline: none;
        border-radius:25px;
        font-size: 15px;
        font-weight: 600;
        margin: 4px;
        cursor:pointer;
    }
`
const TagsWrapper = styled.div`
    display:flex;
    position:absolute;
    bottom:0;
    padding:1rem 0;   
    div{
        margin:0 5px 5px 0;
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