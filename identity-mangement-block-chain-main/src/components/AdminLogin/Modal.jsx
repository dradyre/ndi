import React from 'react'
import {Modal, Table} from 'react-bootstrap'
function UserModal({handleClose, isDisplay, idFront, idBack, user1}) {
    return (
        <div>
            <Modal
            className="modal"
      show={isDisplay}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
     <Modal.Header closeVariant="white" closeButton className="modelMianHeadr " >
        <Modal.Title id="contained-modal-title-vcenter">
        <h1 className='displayHeading text-center'>User Data </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column p-3  modelMian' style={{ alignItems: "center", color: "#FFFFFF" }}>
      <div>
            
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
				
        </div>
      </Modal.Body>
    </Modal>
        </div>
    )
}

export default UserModal
