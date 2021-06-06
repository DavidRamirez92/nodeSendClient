import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';

const Index = () => {

  //Extract auth User from Storage
  const AuthContext = useContext(authContext);
  const {userAuth} = AuthContext;

  useEffect(()=> {
    userAuth();
  },[]);


  return ( 
      <Layout>
        <h1>Index</h1>
      </Layout>
   );
}
 
export default Index;