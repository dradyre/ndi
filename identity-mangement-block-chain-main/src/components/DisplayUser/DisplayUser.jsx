import React,{useEffect, useState} from 'react'
import './DisplayUser.css';
import {contrctAbi,contractAddress} from '../utils/constant'
import {loadWeb3} from "../api/api"
import {Table} from 'react-bootstrap';
import UpdateUser from '../SignUpPage/UpdateUser';
import {useNavigate} from "react-router-dom";
const DisplayUser=({setUserDisplay, metaAddress})=>{ 

    let [user1, setUser1]=useState([{
        name:"",
        email:"",
        dob:"",
        religion:"",
        gender:"",
        zip:"",
        city:"",
        address:""

    }]);
    let [idFront, setIdFront]=useState("");
    let [idBack, setIdBack]=useState("");
    let [isDisplay, setIsDisplay]=useState(false)

const changeRout=()=>{
   
}
    const getdata=async()=>{
        try{
        let acc= await loadWeb3();
        if(metaAddress == "No Wallet"){

        }else{

        
        let web3= window.web3;
        let contract= new web3.eth.Contract(contrctAbi,contractAddress);
        let userData1=await contract.methods.UserMap(metaAddress).call();
        let userData2=await contract.methods._UserMap(metaAddress).call();
        const url1 = `https://ipfs.infura.io/ipfs/${userData1.IdFront}`;
        setIdFront(url1);
        const url2 = `https://ipfs.infura.io/ipfs/${userData2.IdBack}`;
        setIdBack(url2);
        setUser1(
           [ {
                name:userData1.FullName,
                email:userData1.EmailAddress,
                dob:userData1.DoB,
                religion:userData2.religion,
                gender:userData2.gender,
                zip:userData2.zip,
                city:userData2.city,
                address:userData1.useraddress
            }])
        }
    }catch(e){
        console.log("error while get user data", e);
    }
}
console.log(user1);
useEffect(()=>{
getdata();
},[]);
    return (
        < div className='container'>
        {
            isDisplay ? <UpdateUser setIsDisplay={setIsDisplay} changeRout={changeRout}  /> :
        
        <div>
            <h1 className='displayHeading'>User Data </h1>
            <div className='cardContainer'>
           <div id="card-one" className="card">
					<div id="header">ID Front</div>
					<div id="price">
                    <img src={idFront} alt='ID front' width="250px" />

                        </div>
                    </div> 
                    <div id="card-one" className="card">
					<div id="header">ID Back</div>
					<div id="price">
                    <img src={idBack} alt='ID Back' width="250px" />


                        </div>
                    </div>
                    </div>
                    <div className='displayTable'>
                    <Table striped bordered hover variant="dark">
                        <tbody>
                            {
                             user1.map((item, index)=>{
                                 return (
                                     <>
                                     <tr>
                                         <th>Name</th>
                                         <td>{item.name}</td>
                                     </tr>
                                     <tr>
                                         <th>Email</th>
                                         <td>{item.email}</td>
                                     </tr>
                                     <tr>
                                         <th>Date of Birth</th>
                                         <td>{item.dob}</td>
                                     </tr>
                                     <tr>
                                         <th>Religion</th>
                                         <td>{item.religion}</td>
                                     </tr>
                                     <tr>
                                         <th>Gender</th>
                                         <td>{item.gender}</td>
                                     </tr>
                                     <tr>
                                         <th>Zip Code</th>
                                         <td>{item.zip}</td>
                                     </tr>
                                     <tr>
                                         <th>City</th>
                                         <td>{item.city}</td>
                                     </tr>
                                     <tr>
                                         <th>Address</th>
                                         <td>{item.address}</td>
                                     </tr>
                                     </>
                                 )
                             })   
                            }
                        </tbody>
                    </Table>
                    </div>
                
                              <div className='displayButton'>
                                         <button className='btn btn-warning' 
                                         onClick={()=>setIsDisplay(true)}
                                         >Update</button>
                                         <div className='text-white pt-3 pb-5'><span onClick={()=> setUserDisplay(false)}>Go Back<i class="fas fa-hand-point-left text-info fs-4 ps-3"></i></span></div>
                                         </div>
                                         </div>
}
    </div>
    )
}

export default DisplayUser;

