import { useState } from "react";

import {auth, db} from '../firebase';

import logo from "../assets/logo.png";
import netflix_spinner from '../assets/netflix_spinner.gif';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
export default function Login() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);

  const [signUp, setSignup] = useState(false);

  const handleAuth = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(signUp){
      signup(); 
    }else{
      login();
    }
    setLoading(false)
  }
  const signup = async()=>{
    setLoading(true)

    try{
       const res= await createUserWithEmailAndPassword(auth,email,password);
       const user = res.user;
       await addDoc(collection(db,"users"),{
           uid:user.uid,
           name,
           authProvider:"local",
           email,
       });
       toast.success("Sign Up successful");
       
    }
    catch(error){
      toast.error(err.code.split('/')[1].split('-').join(''));

    }
  finally{
    setLoading(false)

  }}
    const login = async()=>{
    setLoading(true)

      try{
          await signInWithEmailAndPassword(auth,email,password);
       toast.success("Sign In successful");

      }
      catch(err){
          console.log("error",err);
          toast.error(err.code.split('/')[1].split('-').join(''));
      }
      finally{
    setLoading(false)

      }
  }


  return (
    loading?<div className="w-full h-screen flex items-center justify-center">
      <img src={netflix_spinner} alt="loading" className="w-[60px]"/>
    </div>:
    <div
      className="h-screen py-5 px-[8%] msm:px-[5%] msm:py-[15px]"
      style={{
        backgroundImage:
          "url(/background_banner.jpg),linear-gradient(#0000007e,#0000007e)",
      }}
    >
      <img src={logo} alt="logo" className="w-[150px]" />
      <div
        className="w-full max-w-[450px] rounded mx-auto p-[60px] msm:p-5 msm:mt-[30px]"
        style={{ background: "rgba(0,0,0,0.75)" }}
      >
        <h1 className="text-[32px] font-medium mb-7">{signUp?'Sign Up':'Sign In'}</h1>
        <form action="put" onSubmit={handleAuth}>
          {signUp && (
            <input
              className="input"
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            className="input"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className="input"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full p-4 bg-[#e50914] text-white rounded text-[16px] font-medium cursor-pointer mt-5"
            type="submit"
          >
          {signUp?'Sign Up':'Sign In'}
          </button>
          <div className="flex items-center justify-between text-[#b3b3b3] text-[13px]">
            <div className="flex items-center gap-2.5">
              <input
                className="w-[18px] h-[18px] input "
                type="checkbox"
                name="remember"
                id="remember"
              />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="mt-10 text-[#737373]">
          {signUp ? (
            <p>
            Already have an account?{" "}
            <span onClick={() => setSignup(!signUp)} className="ml-[6px] text-white font-medium cursor-pointer">
              Sign In Now
            </span>
          </p>
          ) : (
            <p>
              New to Netflix?{" "}
              <span onClick={() => setSignup(!signUp)} className="ml-[6px] text-white font-medium cursor-pointer">
                Sign Up Now
              </span>
            </p>
            
          )}
        </div>
      </div>
    </div>
  );
}
