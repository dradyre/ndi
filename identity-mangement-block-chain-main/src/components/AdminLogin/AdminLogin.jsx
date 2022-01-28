import React, { useRef, useState } from 'react';
import { loadWeb3 } from '../api/api';
import { contrctAbi, contractAddress } from '../utils/constant';
import { Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import AdminDisplay from './AdminDisplay';
import { toast } from 'react-toastify';
function AdminLogin() {
    let navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    let [btnText, setBtnText] = useState("Login");
    let [isDisplay, setIsDisplay]=useState(false);
    let [displayData, setDisplayData]=useState([]);
    const onSubmit = async (data) => {
        try {

            setBtnText("Wait While Prcessing...")
            const web3 = window.web3;
            let contract = new web3.eth.Contract(contrctAbi, contractAddress);
            let res = await contract.methods.ViewUsers(data.password).call();
            setBtnText("Login")
            setDisplayData(res)
            setIsDisplay(true)
            toast.success("Welcome In !")
        } catch (e) {
            toast.error("!Oops you are not admin")
            navigate("/")
            setBtnText("Login")
            console.log("error while admin data");
        }

    }

    return (

        <div className='signInContainer container'>
            {
isDisplay? 
<AdminDisplay displayData={displayData} setDisplay={setIsDisplay}/>:<>
<div className="imageContainer">
                <img src='userLogo.png' width="230px" />
            </div>
            <div className='formContainer'>
                <div className="formInner">
                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='text-white'>Admin Password</Form.Label>
                            <Form.Control className='text-white bg-dark' type="password" placeholder="Enter Password"
                                {...register("password", { required: true })}
                            />
                            {
                                errors.password && <Form.Text className="text-warning">
                                    Please enter correct Password.
                                </Form.Text>
                            }
                        </Form.Group>
                        <div className='d-grid gap-2'>
                            <Button className='btn btn-warning text-white' type='submit'>{btnText}</Button>
                            <div className='text-white pb-5'>If User Click<span onClick={() => navigate("/")}><i class="fas fa-sign-in-alt text-info fs-4 ps-3"></i></span></div>
                        </div>

                    </Form>
                </div>
            </div>
</>
            }
            
        </div>
    )
}

export default AdminLogin
