import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyC0fa81L7J0qnEHeykdvwsEnozdwUIbYJw",
    authDomain: "pinterest-clone-with-react-js.firebaseapp.com",
    projectId: "pinterest-clone-with-react-js",
    storageBucket: "pinterest-clone-with-react-js.appspot.com",
    messagingSenderId: "231873021059",
    appId: "1:231873021059:web:fd7fc9aa5aeaa570cdc7b6",
    measurementId: "G-TX9VMFP783"
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export function useAuth(){
    const googleSignIn = async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(googleProvider);
    };
    const signOut = () => auth.signOut();
    return { googleSignIn, signOut}
}



export {auth, provider}