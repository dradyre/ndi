import React, { useEffect, useState, useRef } from 'react'
import './SignUp.css'
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { contrctAbi, contractAddress } from '../utils/constant';
import { loadWeb3 } from '../api/api';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { create } from 'ipfs-http-client';
const client = create('https://ipfs.infura.io:5001/api/v0')
const UpdateUser = ({setIsDisplay}) => {
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    let newName = useRef()
    let newEmail = useRef();
    let newdob = useRef();
    let newReligion = useRef();
    let newGenderMale = useRef();
    let newGenderFemale = useRef();
    let newGenderNo = useRef();
    let newZip = useRef();
    let newCity = useRef();
    let newAddress = useRef();
    let newIdF = useRef();
    let newIdB = useRef();
    let [btnText, setBtnText] = useState("Update");
    let [idFront, setIdFront] = useState("");
    let [idBack, setIdBack] = useState("");
    let [isMale, setIsMale] = useState(false);
    let [isFeMale, setIsFeMale] = useState(false);
    let [isNo, setIsNo] = useState(false);
    let [changeRoute, setchangeRoute]= useState();
    let [user1, setUser1] = useState({
        name: "",
        email: "",
        dob: "",
        religion: "",
        gender: "",
        zip: "",
        city: "",
        address: "",
        idFront: "",
        idBack: ""

    });
console.log("idFront", idFront);
    const selectGender = (e) => {
        if (e.target.value == "male") {
            setIsMale(true);
            setIsFeMale(false);
            setIsNo(false);
        } else if (e.target.value == "female") {
            setIsFeMale(true);
            setIsMale(false);
            setIsNo(false);
        } else if (e.target.value == "no") {
            setIsNo(true);
            setIsFeMale(false);
            setIsMale(false);
        }
    }

     
    const updateData = async (e) => {
        try {
            setBtnText("Wait while processing...")
            e.preventDefault();
            let newGender = ""
            if (newGenderMale.current.checked) {
                newGender = 'male'

            } else if (newGenderFemale.current.checked) {
                newGender = "female"
            } else {
                newGender = "no"
            }
           
         
            let acc = await loadWeb3();
            let web3 = window.web3;
            let contract = new web3.eth.Contract(contrctAbi, contractAddress);
            
            if(newIdF.current.files.length && newIdB.current.files.length){
                let idFront= newIdF.current.files[0];
            const addedIdFront = await client.add(idFront)
            let idBack= newIdB.current.files[0];
            const addedIdBack = await client.add(idBack);
                await contract.methods.UpdateUserInfo(
                    newName.current.value,
                    newZip.current.value,
                    newdob.current.value,
                    newEmail.current.value,
                    newAddress.current.value,
                    newCity.current.value,
                    newGender,
                    newReligion.current.value,
                    addedIdFront.path,
                    addedIdBack.path
                ).send({from:acc});
                setBtnText("Update")
                toast.success("Updated successed");
                window.location.reload();
            } else if(newIdF.current.files.length){
                let idFront= newIdF.current.files[0];
            const addedIdFront = await client.add(idFront)
                await contract.methods.UpdateUserInfo(
                    newName.current.value,
                    newZip.current.value,
                    newdob.current.value,
                    newEmail.current.value,
                    newAddress.current.value,
                    newCity.current.value,
                    newGender,
                    newReligion.current.value,
                    addedIdFront.path,
                    user1.idBack
                ).send({from:acc});
                setBtnText("Update")
                window.location.reload();                
                toast.success("Updated successed");

            }else if(newIdB.current.files.length){
                let idBack= newIdB.current.files[0];
            const addedIdBack = await client.add(idBack);
                await contract.methods.UpdateUserInfo(
                    newName.current.value,
                    newZip.current.value,
                    newdob.current.value,
                    newEmail.current.value,
                    newAddress.current.value,
                    newCity.current.value,
                    newGender,
                    newReligion.current.value,
                    user1.idFront,
                    addedIdBack.path
                ).send({from:acc});
                setBtnText("Update")
                window.location.reload();
                toast.success("Updated successed");
            }else{
            await contract.methods.UpdateUserInfo(
                newName.current.value,
                newZip.current.value,
                newdob.current.value,
                newEmail.current.value,
                newAddress.current.value,
                newCity.current.value,
                newGender,
                newReligion.current.value,
                user1.idFront,
                user1.idBack
            ).send({from:acc});
            setBtnText("Update")
            window.location.reload();
            toast.success("Updated successed");
        }    
        } catch (e) {
            setBtnText("Update")
            toast.error("Updated failed");
            console.log("error while submit data", e);
        };
    }
    const getData = async () => {
        try {
            let acc = await loadWeb3();
            let web3 = window.web3;
            let contract = new web3.eth.Contract(contrctAbi, contractAddress);
            let userData1 = await contract.methods.UserMap(acc).call();
            let userData2 = await contract.methods._UserMap(acc).call();
            const url1 = `https://ipfs.infura.io/ipfs/${userData1.IdFront}`;
            setIdFront(url1);
            const url2 = `https://ipfs.infura.io/ipfs/${userData2.IdBack}`;
            setIdBack(url2);
            if (userData2.gender == "male") {
                setIsMale(true)
            } else if (userData2.gender == "female") {
                setIsFeMale(true);
            } else if (userData2.gender == "no") {
                setIsNo(true)
            }
            setUser1(
                {
                    name: userData1.FullName,
                    email: userData1.EmailAddress,
                    dob: userData1.DoB,
                    religion: userData2.religion,
                    gender: userData2.gender,
                    zip: userData2.zip,
                    city: userData2.city,
                    address: userData1.useraddress,
                    idFront: userData1.IdFront,
                    idBack: userData2.IdBack
                })
        } catch (e) {
            console.log("error while get user data", e);
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div className='signUpContainer container'>
                <div className="imageContainer">
                    <img src='userLogo.png' width="180px" />
                </div>
                <div className='formContainer'>
                    <div className="formInner ">
                        <Form onSubmit={updateData}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label className='text-white'>Full Name</Form.Label>
                                    <Form.Control 
                                    defaultValue={user1.name}
                                        className='text-white bg-dark' type="text"
                                        placeholder="Enter name"
                                        ref={newName}
                                    />
                                    {
                                        errors.name && <Form.Text className="text-warning">
                                            Please enter First Name.
                                        </Form.Text>
                                    }

                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label className='text-white'>Date of Birth</Form.Label>
                                    <Form.Control
                                        defaultValue={user1.dob}

                                        className='text-white bg-dark'
                                        type="date" placeholder="2018-07-22"
                                        ref={newdob}
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
                                    defaultValue={user1.email}
                                    placeholder="Enter Email"
                                    type="email"
                                    ref={newEmail}
                                />
                                {
                                    errors.email && <Form.Text className="text-warning">
                                        Please enter Using Email.
                                    </Form.Text>
                                }
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className='text-white'>Religion </Form.Label>
                                <Form.Control className='text-white bg-dark'
                                    defaultValue={user1.religion}
                                    type='text'
                                    ref={newReligion}
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
                                        checked={isMale}
                                        
                                        ref={newGenderMale}
                                        value="male"
                                        onClick={selectGender}
                                        name="gender" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Check type='radio' label="Female" className='text-white'
                                        ref={newGenderFemale}
                                        checked={isFeMale}
                                        value="female"
                                        onClick={selectGender}
                                        name="gender" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Check type='radio' label="No" className='text-white'
                                        ref={newGenderNo}
                                        value="no"
                                        checked={isNo}
                                        onClick={selectGender}
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
                                        defaultValue={user1.city}
                                        ref={newCity}
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
                                        ref={newZip}
                                        defaultValue={user1.zip}
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
                                    ref={newAddress}
                                    defaultValue={user1.address}
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
                                    onChange={(e)=>{
                                        setIdFront(URL.createObjectURL(e.target.files[0]));
                                    }}
                                        ref={newIdF}
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
                                    onChange={(e)=>{
                                        setIdBack(URL.createObjectURL(e.target.files[0]));
                                    }}
                                        ref={newIdB}

                                        type="file" />
                                    {
                                        errors.idback && <Form.Text className="text-warning">
                                            Please enter Id Back.
                                        </Form.Text>
                                    }
                                </Form.Group>
                            </Row>
                            <Row>
                                <div className='imgDicContainer mb-3'>
                                    <div className='imgDiv'>
                                        <img as={Col} src={idFront} alt='ID front' width="200px" />
                                    </div>
                                    <div className='imgDiv'>
                                        <img as={Col} src={idBack} alt='ID front' width="200px" />
                                    </div>
                                </div>
                            </Row>
                            <div className='d-grid gap-2 mb-3'>
                                <Button className='btn btn-warning text-white' type="submit" >{btnText}</Button>
                            </div>
                            <div className='text-white pt-3 pb-5'><span  onClick={()=> setIsDisplay(false)}>Go Back<i class="fas fa-hand-point-left text-info fs-4 ps-3"></i></span></div>
                        </Form>


                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateUser;