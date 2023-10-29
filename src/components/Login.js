import { useRef, useState } from "react";
import Header from "./Header"; 
import { checkValidDataSignInForm, checkValidDataSignUpForm } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";


const Login = () => {
    // Using useState Variable to toggle between sign in and sign up form.
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        // Validate the form data
        // checkValidData(email, password)
        if(isSignInForm){

        const message = checkValidDataSignInForm(email.current.value, password.current.value);
        setErrorMessage(message);
        if(message) return;

        } else {
 
        const message = checkValidDataSignUpForm(name.current.value, email.current.value, password.current.value);
        setErrorMessage(message);
        if(message) return;
    }
        // Sign In Sign Up Logic
        if(!isSignInForm){
            //Sign Up API
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateProfile(user, {
                
                  })
                  .then(() => {
                    const {uid, email} = auth.currentUser;
                    dispatch(
                        addUser({
                        uid: uid, 
                        email: email, 
                        
                    })
                    ); 
                  }).catch((error) => {
                    // An error occurred
                    setErrorMessage(error.message);
                  });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
                // ..
            });
        } else {
            //Sign In Logic 
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            
            
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+ "-" +errorMessage);
            });
        }

    };

    const toggleSignInForm = () => {
        // If one of them is true, the other one will be false.
        setIsSignInForm(!isSignInForm);
    };

    return (
        <div >
        
<div className="ml-8 mt-8">
<h2>Use This Email Id or Password If u don't want Signup Till I am Working On Test userCredential Feature</h2>
        <h1>Email:Dummy@gmail.com</h1>
        <h1>Password:Dummy@123</h1>
</div>
        
        <div className="-mt-[150]">

        
            <form onSubmit = {(e) => e.preventDefault() } 
            
            className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-90">
                <h1 className="font-bold text-3xl py-4" >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm &&(
                    <input 
                    ref = {name}
                    type="text" 
                    placeholder="Full Name" 
                    className="p-4 my-4 w-full bg-gray-700"
                    />
                )}
                <input 
                ref = {email}
                type="text" 
                placeholder="Email Address"
                className="p-4 my-4 w-full bg-gray-700"
                />
                <input 
                ref = {password}
                type="password" 
                placeholder="Password" 
                className="p-4 my-4 w-full bg-gray-700"
                />
                <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
                <button 
                className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
                {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now": "Alread registered? Sign In Now" }
                </p>
            </form>
        </div>
        </div>
    )
};
export default Login;