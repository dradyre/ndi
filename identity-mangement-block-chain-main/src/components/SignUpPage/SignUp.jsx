import React,{useState} from 'react'
import './SignUp.css'
import {useNavigate} from "react-router-dom";
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import {contrctAbi,contractAddress} from '../utils/constant';
import {loadWeb3} from '../api/api';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { create } from 'ipfs-http-client';
const client = create('https://ipfs.infura.io:5001/api/v0')
const SignUp = () => {
    let navigate=useNavigate();
    let [btnText, setBtnText] = useState("SignUp");
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async(data) =>{
        try{
            setBtnText("Wait While processing...")
            let acc= await loadWeb3();
            let web3= window.web3;
            let contract =new web3.eth.Contract(contrctAbi, contractAddress);
            let userExist=await contract.methods._UserMap(acc).call();
            if(userExist.status == true){
                setBtnText("SignUp")
                toast.info("youser already exist!");
            navigate("/");

            }else{
            let idFront= data.idfront[0];
            const addedIdFront = await client.add(idFront)
            let idBack= data.idback[0];
            const addedIdBack = await client.add(idBack);
            await contract.methods.AddUser(
                data.name,
                data.dob,
                data.email,
                data.address,
                data.city,
                data.zip,
                data.gender,
                data.religion,
                addedIdFront.path,
                addedIdBack.path
            ).send({from:acc});
            setBtnText("SignUp")
            toast.success("Sign Up successfully");
            navigate("/");
        }
        }catch(e){
            setBtnText("SignUp")
            console.log("error while submit data", e);
        }
;
    } 
    return (
        <>
            <div className='signUpContainer container'>
                <div className="imageContainer">
                    <img src='userLogo.png' width="180px" />
                </div>
                <div className='formContainer'>
                    <div className="formInner ">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label className='text-white'>Full Name</Form.Label>
                                    <Form.Control className='text-white bg-dark' type="text" placeholder="Enter name" 
                                    {...register("name", {required:true})}
                                    />
                                    {
                                        errors.name && <Form.Text className="text-warning">
                                        Please enter First Name.
                                    </Form.Text>
                                    }

                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label className='text-white'>Date of Birth</Form.Label>
                                    <Form.Control className='text-white bg-dark' type="date" placeholder="2018-07-22"
                                    {...register("dob", {required:true})}
                                    />
                                    {
                                        errors.dob && <Form.Text className="text-warning">
                                        Please enter Date of Birth.
                                    </Form.Text>
                                    }
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label className="text-white">Email</Form.Label>
                                <Form.Control className='text-white bg-dark'
                                 placeholder="Enter Email"
                                 type="email"
                                 {...register("email", {required:true})}
                                 />
                                 {
                                        errors.email && <Form.Text className="text-warning">
                                        Please enter Using Email.
                                    </Form.Text>
                                    }
                            </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className='text-white'>Religion </Form.Label>
                                    <Form.Control className='text-white bg-dark' type='text'
                                    {...register("religion", {required:true})}
                                    placeholder='Enter Religion' />
                                    {
                                        errors.religion && <Form.Text className="text-warning">
                                        Please enter Religion.
                                    </Form.Text>
                                    }
                                </Form.Group>

                            <Row>

                                <Form.Group as={Col} className="">
                                    <Form.Check className="" type='radio' label="Male" className='text-white'
                                    {...register("gender", {required:true})}
                                    value="male"
                                    name="gender" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Check type='radio' label="Female" className='text-white'
                                    {...register("gender", {required:true})}
                                    value="female"
                                    name="gender" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Check type='radio' label="No" className='text-white'
                                    {...register("gender", {required:true})}
                                    value="No"
                                    name="gender" />
                                </Form.Group>
                                {errors.gender && <Form.Text className="text-warning mb-3">
                                        Please select Gender.
                                    </Form.Text>
                                    }
                            </Row>

                            <Row className="mb-3 mt-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label className="text-white">City</Form.Label>
                                    <Form.Control className="text-white bg-dark" type="text" 
                                    {...register("city", {required:true})}
                                    placeholder='Enter City' />
                                    {
                                         errors.city && <Form.Text className="text-warning">
                                         Please enter your city.
                                     </Form.Text>
                                    }
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label className="text-white">Zip</Form.Label>
                                    <Form.Control className="text-white bg-dark" type="text"
                                    {...register("zip", {required:true})}
                                    placeholder='Enter Zip' />
                                    {
                                         errors.zip && <Form.Text className="text-warning">
                                         Please enter zip code.
                                     </Form.Text>
                                    }
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label className="text-white">Address</Form.Label>
                                <Form.Control className="text-white bg-dark" type="text" 
                                {...register("address", {required:true})}
                                placeholder="1234 Main St" />
                                {
                                         errors.address && <Form.Text className="text-warning">
                                         Please enter correct address.
                                     </Form.Text>
                                    }
                            </Form.Group>

                                    <Row>
                                    <Form.Group className="mb-3" as={Col} controlId="formGridCity">
                                    <Form.Label className="text-white">ID Front</Form.Label>
                                    <Form.Control className="text-white bg-dark" type="file"
                                    {...register("idfront", {required:true})}
                                    />
                                    {
                                         errors.idfront && <Form.Text className="text-warning">
                                         Please enter Id Front.
                                     </Form.Text>
                                    }
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label className="text-white">ID Back</Form.Label>
                                    <Form.Control className="text-white bg-dark"
                                    {...register("idback", {required:true})}
                                    type="file"  />
{
                                         errors.idback && <Form.Text className="text-warning">
                                         Please enter Id Back.
                                     </Form.Text>
                                    }
                                </Form.Group>
                                    </Row>
                            <div className='d-grid gap-2 mb-3'>
                                <Button className='btn btn-warning text-white' type="submit">{btnText}</Button>
                            </div>
                            <div className='text-white pb-5'>Already registred<span onClick={()=> navigate("/")}><i class="fas fa-sign-in-alt text-info fs-4 ps-3 "></i></span></div>

                        </Form>

                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignUp;