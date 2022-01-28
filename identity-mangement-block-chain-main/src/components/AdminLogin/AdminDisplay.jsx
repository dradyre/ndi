import React, { useState } from 'react'
import { Table } from 'react-bootstrap';
import './Admin.css';
import { contrctAbi, contractAddress } from '../utils/constant';

import UserModal from './Modal';
function AdminDisplay({ displayData, setDisplay }) {
    let [btnText, setBtnText] = useState("Click!");
    let [inputAddress, setInputAddress] = useState();
    let [isDisplay, setIsDisplay] = useState("admindisplay");
    let [isModal, setIsModal]= useState(false)
    let [idFront, setIdFront] = useState("");
    let [idBack, setIdBack] = useState("");
    let [user1, setUser1] = useState([{
        name: "",
        email: "",
        dob: "",
        religion: "",
        gender: "",
        zip: "",
        city: "",
        address: ""

    }]);
    const handleClose = () => {
        setIsModal(false)
        setIsDisplay("admindisplay");
    }
    const displayUser = async (item) => {
        try {
            setIsDisplay("loading")
            let web3 = window.web3;
            let contract = new web3.eth.Contract(contrctAbi, contractAddress);
            let userData1 = await contract.methods.UserMap(item).call();
            let userData2 = await contract.methods._UserMap(item).call();
            const url1 = `https://ipfs.infura.io/ipfs/${userData1.IdFront}`;
            setIdFront(url1);
            const url2 = `https://ipfs.infura.io/ipfs/${userData2.IdBack}`;
            setIdBack(url2);
            setUser1(
                [{
                    name: userData1.FullName,
                    email: userData1.EmailAddress,
                    dob: userData1.DoB,
                    religion: userData2.religion,
                    gender: userData2.gender,
                    zip: userData2.zip,
                    city: userData2.city,
                    address: userData1.useraddress
                }]);
                setIsModal(true)
            setIsDisplay("modal");
        } catch (e) {
            setIsDisplay("admindisplay");
            console.log("error while get user data", e);
        }

    }
    if (isDisplay == "loading") {
        return (
            <div className="position-absolute top-50 start-50 translate-middle">
        <div className="spinner-grow text-warning modalLoadar" role="status" >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    } else if (isDisplay == "modal") {
        return (
            <>
                isDisplay ? <UserModal handleClose={handleClose} isDisplay={isModal}
                    idFront={idFront}
                    idBack={idBack}
                    user1={user1}
                />
            </>
        )
    } else if (isDisplay == "admindisplay") {
        return (
            <div className="adminTable container">

                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <th>All user address</th>
                        </tr>
                        {
                            displayData.map((item) => {
                                return <tr>
                                    <td
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            displayUser(item)
                                        }
                                    >{item}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
                <div className='text-white pt-3 pb-5'><span onClick={() => setDisplay(false)}>Go Back<i className="fas fa-hand-point-left text-info fs-3 ps-3"></i></span></div>
            </div>
        )
    }
    // return (
    //     <>
    //         {
    //             isDisplay ? <UserModal handleClose={handleClose} isDisplay={isDisplay}
    //             idFront={idFront}
    //             idBack={idBack}
    //             user1={user1}
    //             /> :
    //                 <div className="adminTable">

    //                     <Table striped bordered hover variant="dark">
    //                         <tbody>
    //                             <tr>
    //                                 <th>All user address</th>
    //                             </tr>
    //                             {
    //                                 displayData.map((item) => {
    //                                     return <tr>
    //                                         <td
    //                                         style={{cursor: "pointer"}}
    //                                             onClick={() =>
    //                                                 displayUser(item)
    //                                                  }
    //                                         >{item}</td>
    //                                     </tr>
    //                                 })
    //                             }
    //                         </tbody>
    //                     </Table>
    //                     <div className='text-white pt-3 pb-5'><span  onClick={()=> setDisplay(false)}>Go Back<i className="fas fa-hand-point-left text-info fs-3 ps-3"></i></span></div>
    //                 </div>
    //         }
    //     </>

    // )
}

export default AdminDisplay
