import React,{useState, useEffect} from 'react'
import './SignIn.css';
import { Button, Form } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {loadWeb3} from '../api/api';
import {contrctAbi,contractAddress} from "../utils/constant"
import {toast} from 'react-toastify';
import DisplayUser from '../DisplayUser/DisplayUser';


import Web3 from 'web3';
const webSupply =new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/")
function SignIn({metaAddress}) {
    let navigate=useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    let [account, setAccount]= useState();
    let [userDisplay, setUserDisplay]=useState(false);
    let [btnText, setBtnText] = useState("Login")

    const onSubmit = async(data) =>{
        try{
            setBtnText("Wait While Processing...")
        let acc=await loadWeb3()
        let web3= window.web3;
        let contract= new web3.eth.Contract(contrctAbi,contractAddress);
        let userExist= await contract.methods.UserMap(acc).call();
        if(data.email == userExist.EmailAddress && userExist.MetaMaskaddress == acc){
            setUserDisplay(true)
            toast.success("Welcome in Dark Id!")
            setBtnText("Login")
        }else{
            setUserDisplay(false)
            navigate("/signup")
            toast.error("user not exist signup please!")
            setBtnText("Login")
        }
    }catch(e){
        setBtnText("Login")
        console.log("error while login", e);
    }

    }
    const getAccount=async()=>{
        let acc= await loadWeb3();
        setAccount(acc);   
    }
  
 
    setInterval(() => {
        getAccount();
    }, 1000);
    useEffect(() => {
        getAccount();
        return () => {
           setAccount({})
        };
    }, [])

    return (
        <div className='container'>
            {
                userDisplay ?
                <DisplayUser setUserDisplay={setUserDisplay} metaAddress={metaAddress} /> 
                 :
                <div className='signInContainer'>
                <div className="imageContainer">
                    <img src='userLogo.png' width="230px" />
                </div>
                <div className='formContainer'>
                    <div className="formInner">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='text-white'>Email address</Form.Label>
                                <Form.Control className='text-white bg-dark' type="email" placeholder="Enter email"
                                {...register("email", {required:true})}
                                />
                                {
                                errors.email && <Form.Text className="text-warning">
                                    Enter Correct Email.
                                </Form.Text>
                                }
                                
                                
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='text-white'>Password</Form.Label>
                                <Form.Control className='text-white bg-dark'  value={account} disabled
                                />
                            </Form.Group>
                            <div className='d-grid gap-2'>
                            <Button className=' btn btn-warning text-white' type="submit">{btnText}</Button>
                            </div>
                            <div className='text-white'>If Not Regisered Click <span  onClick={()=>navigate("/signup")}><i class="fas fa-user-plus text-info fs-5 mt-2 ms-3"></i></span></div>
                            <div className='text-white'>Are you admin Click! <span  onClick={()=>navigate("/AdminLogin")}><i className="fas fa-user-cog text-info fs-5 mt-2 pb-2 ms-3"></i></span></div>
                            <span></span>
                        </Form>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default SignIn
