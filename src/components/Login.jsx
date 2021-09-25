import React from 'react';
import { ArrowDropDownCircle,  ArrowUpwardRounded, Facebook, Pinterest } from "@material-ui/icons";
import {auth, provider} from "../utils/firebase";
import styled from 'styled-components';
import Pin from "./Pin";
import unsplash from "../api/unsplash";

const Login = () => {
    // State Hook
    const [scroll, setScroll] = React.useState(false);
    const [pins, setPins] = React.useState([]);
    const [formState, setFormState] = React.useState('signUp');
    //Functions
    const handleAuth = () =>{
        auth.signInWithPopup(provider).then( result =>{
            console.log(result)
        }).catch( error => alert(error.message));
    }
    const createUser = (email,password) =>{
        auth.createUserWithEmailAndPassword(email,password).then(
            userCredential => {
                const user = userCredential.user;
                console.log(user);
            }
        ).catch( error => console.log(error.message));
    }
    const signIn = (email, password) => {
        auth.signInWithEmailAndPassword(email,password).then( userCredential => {
            const user = userCredential.user;
            console.log("user:",user);
        }
        ).catch( error => console.log(error.message()) );
    }
    const getImages = searchTerm => {
        unsplash.get("https://api.unsplash.com/search/photos/",{
            params:{
                query: searchTerm,
                per_page: 18
            }
        }).then( result => { setPins( result.data.results ); })
    }
    const handleTab = (name) =>{
        let i = "", tabContent = "";
        tabContent = document.getElementsByClassName("tabContent");
        for (i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }
        document.getElementById(name).style.display = "block";
        getImages(name.slice(0,-3));
    }
    const scrollDown = () =>{
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
    const scrollUp = () =>{
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Effect Hook
    React.useEffect( () =>{
        document.getElementById('dinner').click();
    },[]);
    React.useEffect( () =>{
        window.addEventListener('scroll',()=>{
            if(window.scrollY > 10)
                setScroll(true);
            else setScroll(false);
        });
        return () => { window.removeEventListener('scroll',() => {}) };
    },[]);
    return (
        <Wrapper>
            <UpSectionWrapper>
                <HeadingWrapper>
                    <h1>Get your next</h1>
                    <div id="dinnerTab" className="tabContent"><h1 >weeknight dinner idea</h1></div>
                    <div id="homeTab" className="tabContent"><h1 >home decor idea</h1></div>
                    <div id="outfitTab" className="tabContent"><h1 >new look outfit</h1></div>
                    <div id="greenTab" className="tabContent"><h1 >green thumb idea</h1></div>
                </HeadingWrapper>
                <TabIconsWrapper>
                    <div id="dinner" onClick={() => handleTab('dinnerTab')}></div>
                    <div id="home" onClick={() => handleTab('homeTab')}></div>
                    <div id="outfit" onClick={() => handleTab('outfitTab')}></div>
                    <div id="green" onClick={() => handleTab('greenTab')}></div>
                </TabIconsWrapper>
                <PinsWrapper>
                    <div>{ pins.map( pin => { return <Pin key={pin.id} url={pin.urls.small}/> }) }</div>
                </PinsWrapper>
                <DropDownIconWrapper>
                    {!scroll && <ArrowDropDownCircle onClick={scrollDown}/>}
                </DropDownIconWrapper>
            </UpSectionWrapper>

            <DownSectionWrapper>
                <DropUpIconWrapper>
                    {scroll && <ArrowUpwardRounded onClick={scrollUp}/>}
                </DropUpIconWrapper>
                <div className="heading">
                    <h1>Sign up to get your ideas</h1>
                </div>
                <FormWrapper>
                    <br/>
                    <Pinterest/>
                    <h3>Welcome to Pinterest</h3>
                    <p>Find new ideas to try</p>
                    <SignInWrapper>
                        { formState === 'signUp'? <form id="signUpForm" onSubmit={createUser}>
                            <input name='email' type="text" placeholder="Email" />
                            <input name='password' type="password" placeholder="Create a Password"/>
                            <input name='age' type="text" placeholder="Age"/>
                            <button type="submit">Continue</button>
                        </form> : <form id="loginForm" onSubmit={signIn}>
                            <input name='email' type="text" placeholder="Email" />
                            <input name='password' type="password" placeholder="Password"/>
                            <button type="submit">Login</button>
                        </form> }
                    </SignInWrapper>
                    <h4>OR</h4>
                    <FacebookButton>
                        <Facebook/>
                        <span>Continue with Facebook</span>
                    </FacebookButton>
                    <GoogleButton>
                        <span onClick={ handleAuth }>Continue with Google</span>
                    </GoogleButton>
                    <TermsWrapper>
                        <p>By continuing, you agree to Pinterest's <strong>Terms of Service</strong> and acknowledge you've read our <strong>Privacy Policy</strong></p>
                        { formState === 'signUp' ?
                            <p onClick={ () => {setFormState('login')}}><strong>Already a member? Log in</strong></p> :
                            <p onClick={ () => {setFormState('signUp')}}><strong>Not on Pinterest yet? Sign up</strong></p>
                        }
                        <p>Are you a business? <strong>Get started here!</strong></p>
                    </TermsWrapper>
                    <BusinessAccountWrapper>
                        <p>Create a free business account</p>
                    </BusinessAccountWrapper>
                </FormWrapper>
            </DownSectionWrapper>
        </Wrapper>
    );
};
export default Login;

const Wrapper = styled.div`
    overflow:hidden;
`
const UpSectionWrapper = styled.div`
    height: calc(100vh - 80px);
`
const TabIconsWrapper = styled.div`
    width: 100%;
    padding: 20px 0;
    display:flex;
    justify-content:center;
    align-items:center;
    div{
       width: 10px;
       height: 10px;
       border-radius: 50%;
       background: #E1E1E1;
       margin: 5px;
    }
    #dinner{ background:#C28B00; }
    #home{ background:#407A57; }
    #outfit{ background:#0076D3; }
    #green{ background:#407A57; }
`
const HeadingWrapper = styled.div`
    text-align:center;
    font-size:2rem;
    font-weight:600;
`
const PinsWrapper = styled.div`
    padding: 10px 20px;
    columns: 5;
    column-gap: 0;
    position:absolute;
    z-index:-10;
    // height: calc(100vh * 2 - 300px);
    // overflow:hidden;
`
const DropDownIconWrapper = styled.div`
    z-index:200;
    position:fixed;
    right: 50%;
    top:85vh;
    .MuiSvgIcon-root{
        color:#C28B00;
        font-size: 4rem;
    }
    animation: upDown 2s ease infinite;
    @keyframes upDown {
      0% { transform: translateY(-10%); }
      50% { transform: translateY(10%); }
      100% { transform: translateY(-10%); }
    }
`
const DropUpIconWrapper = styled.div`
    z-index:200;
    position:fixed;
    right: 50%;
    top:5vh;
    .MuiSvgIcon-root{
        color:#C28B00;
        font-size: 4rem;
    }
    animation: upDown 2s ease infinite;
    @keyframes upDown {
      0% { transform: translateY(-10%); }
      50% { transform: translateY(10%); }
      100% { transform: translateY(-10%); }
    }
`
const DownSectionWrapper = styled.div`
    z-index:10;
    display:flex;
    justify-content:space-between;
    position:absolute;
    top: 100vh;
    padding: 1rem 3rem;
    .heading{ 
        width:40%;
        h1{ font-size: 70px; color: #FFF;}
    }
`
const FormWrapper = styled.div`
    .MuiSvgIcon-root{
        color:#E60023;
        font-size: 40px;
    }
    h4{
        margin:1rem 0;
    }
    display:flex;
    flex-direction:column;
    align-items:center;
    height: 95vh;
    width: 32%;
    background:white;
    border-radius: 25px;
`
const SignInWrapper =styled.div`
    display:flex;
    justify-content:center;
    width: 80%;
    margin-top:1rem;
    button{
        color:white;
    }
    form > input{
        height: 40px;
        width: calc(100% - 2rem);
        padding: 0 1rem;
        background:#EFEFEF;
        font-size: 15px;
        font-weight: 600;
        border: none;
        border-radius:50px;
        margin-bottom: 0.7rem;
    }
    input:focus{
        outline: #E60023;
    }
    form > button{
        background:#E60023;
        height: 40px;
        width: 100%;
        border: none;
        outline: none;
        border-radius:25px;
        font-size: 15px;
        font-weight: 600;
        cursor:pointer;
    }
`
const ButtonWrapper = styled.div`
    height: 40px;
    width: 80%;
    border: none;
    outline: none;
    border-radius:25px;
    font-size: 15px;
    font-weight: 600;
    cursor:pointer;
`
const FacebookButton = styled(ButtonWrapper)`
    display:flex;
    align-items:center;
    justify-content:center;
    .MuiSvgIcon-root{
        color:#FFF;
        font-size:30px;
    }
    span{
        color:#FFF;
    }
    background: #0078FF;
    margin-bottom: 1rem;
`
const GoogleButton = styled(ButtonWrapper)`
    display:flex;
    align-items:center;
    justify-content:center;
    border: 1px solid black;
`
const TermsWrapper = styled.div`
    padding: 0 1rem;
    margin:auto;
    p{
        text-align:center;
        font-size:12px;
    }
`
const BusinessAccountWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:50px;
    width:100%;
    background:#EFEFEF;
    border-bottom-left-radius:25px;
    border-bottom-right-radius:25px;
    p{
        font-weight: 600;
    }
`