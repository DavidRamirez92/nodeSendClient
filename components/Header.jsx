import React,{useContext,useEffect} from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
const Header = () => {

    //Extract auth User from Storage
  const AuthContext = useContext(authContext);
  const {user, userAuth, logOut } = AuthContext;

  useEffect(()=> {
    userAuth();
  },[]);

    return ( 
        <header className="py-8 flex flex-col md:flex-row item-center justify-between">
            <Link href="/">
                <img className="w-64 mb-8 md:mb-0 cursor-pointer" src="logo.svg"/>
            </Link>
            

            <div>
                {user ? (
                    <div className="flex items-center">
                        <p className="mr-2">Hi {user.name}</p>
                        <button 
                            type="button"
                            className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                            onClick={() => logOut()}>
                        Log Out</button>
                    </div>
                ) : (
                    <>
                        <Link href="/login">
                        <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Login</a>
                        </Link>
                        <Link href="/createaccount">
                            <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Create Account</a>
                        </Link>
                    </>
                )}
                
            </div>
        </header>
     );
}
 
export default Header;