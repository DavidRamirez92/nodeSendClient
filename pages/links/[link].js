import Layout from '../../components/Layout';
import clientAxios from '../../config/axios';
import React,{useState, useContext} from 'react';
import appContext from '../../context/app/appContext';
import Alert from '../../components/Alert';

export async function getServerSideProps({params}) {
    const{link} = params;
   // console.log(link);
    const answer = await clientAxios.get(`/api/links/${link}`);

    //console.log(answer);
    return{
        props:{
            link: answer.data
        }
    }
}

export async function getServerSidePaths() {
    const links = await clientAxios.get('/api/links');

    return {
        paths: links.data.links.map(link =>( {
            params: {link: link.url}
        })),
        fallback: false
    }
}

export default ({link}) => {

    const AppContext = useContext(appContext);
    const {showAlert, message_file} = AppContext;

    const [hasPassword,setHasPassword] = useState(link.password);
    const [password,setPassword] = useState('');

    console.log(hasPassword);
   // console.log(link);
   const verifyPassword = async e => {
       e.preventDefault();

       const data = {
           password
       }

       try {
            const answer = await clientAxios.post(`/api/links/${link.link}`,data);
           setHasPassword(answer.data.password);
       } catch (error) {
            showAlert(error.response.data.msg);
       }
       
       
   }
    return (
        <Layout>
            {
                hasPassword ? (
                    <>
                        <p className="text-center">This link has password, place it below</p>

                        {message_file && <Alert/>}
                        <div className="flex justify-center mt-5">
                            <div className="w-full max-w-lg">
                                <form
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={e => verifyPassword(e)}
                                >
                                    <div className="mb-4">
                                        <label 
                                            className= "block text-black text-sm font-bold mb-2"
                                            htmlFor="password">Password</label>
                                        <input 
                                            type="password"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        
                                            />         
                                    </div>

                                    <input
                                        type="submit"
                                        className="bg-red-500 hover:bg-gray-900 cursor-pointer w-full p-2 text-white uppercase font-bold"
                                        value="Validate Password"
                                    />
                                </form> 
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl text-center text-gray-700">Download the File:</h1>
                        <div className="flex items-center justify-center mt-10">
                            <a href={`${process.env.backendURL}api/files/${link.file}`} className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer">Here</a>
                        </div>
                    </>
                )
            }
            
        </Layout>
    )
}