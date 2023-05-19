import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authContext } from "../authentication/AuthProviders";
import useTitle from "../hooks/useTitle";


export default function Login() {
    

    useTitle('Login')
    const location = useLocation()

    const from = location.state?.from?.pathname || '/';


    const {userLogin,googleSignIn,githubSignIn ,googleLogin ,githubLogin} = useContext(authContext)

    const navigate = useNavigate();
    const notify = (message) => toast.error(message);


    const login = (event) =>{
        event.preventDefault(); 

        userLogin(event.target.email.value,event.target.password.value).then(()=>{

            // navigate(from);
            window.location.replace(from);
               
        }).catch((error)=>{
            if(error.message == 'Firebase: Error (auth/wrong-password).'){
                notify('wrong-password.')
              }
              if(error.message == 'Firebase: Error (auth/user-not-found).'){
                notify('user not found.')
              } 

            console.log(error)
        })
    }

    const singIn = () =>{
        googleLogin().then(()=>{
            navigate('/')
        })
    }
    const github = () =>{
        githubLogin().then(()=>{
            navigate('/')
        })
    }
    return (
        <div>

        <ToastContainer position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"/>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-green-500">Login now!</h1>
                        
                    </div>
                    <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100" onSubmit={login}>
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" id="email" placeholder="email" className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" id="password" placeholder="password" className="input input-bordered" required/>
                                <div className="flex gap-3">
                                <label className=" mt-3 cursor-pointer" onClick={()=>{singIn()}}><FcGoogle size={35}/></label>
                                <label className=" mt-3 cursor-pointer" onClick={()=>{github()}}><IoLogoGithub size={35}/></label>
                                </div>
 


                               
                            </div>
                            <label className="label">
                                    <Link to="/register" className="label-text-alt link">Dont have an account ?</Link>
                                </label>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary btn-ghost text-white bg-green-500 hover:bg-green-600">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}