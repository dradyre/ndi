import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { GiWallet } from "react-icons/gi";
import './DisplayMessage.css'
function DisplayMessage({ show, handleClose }) {

    return (
        <>
            <Modal
                 show={show}
                 onHide={handleClose}
                 backdrop="static"
                 keyboard={false}
            >
                <Modal.Header closeVariant="white" closeButton className="modelMianHeadr" >

                </Modal.Header>


                <Modal.Body className='d-flex flex-column p-3  modelMian' style={{ alignItems: "center", color: "#FFFFFF" }}>

                <h1 className='text-white text-center'>Install Wallet</h1>
<div className='ms-2 mt-3'>
    <GiWallet style={{ fontSize: "100px" }} />
    <br />
</div>
Wallet to be activated
<div className='m-3'>

    <a target="_blank" href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en' ><Button variant="secondary" className='btn btn-warning'>Click here to activate the wallet</Button></a>
</div>
<div className='m-3'>
    <Button variant="secondary" className='btn btn-danger' onClick={() => window.location.reload(false)}>Activated; Click to refresh it</Button>
</div>


</Modal.Body>
            </Modal>
        </>
    )
}

export default DisplayMessage
