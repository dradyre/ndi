import React, { useState, useEffect } from 'react'
import './Connect.css';
import {loadWeb3} from '../api/api';
import DisplayMessage from '../Display message/DisplayMessage';
function Connect({setIsCahnge, getMetaAddress}) {
    let [account, setAccount]=useState();
    const [show, setShow] = useState(false);
    let [btnText, setBtnText]=useState("Connect")
    const handleClose = () => setShow(false);
    const getAccount=async()=>{
        setBtnText("Wait While Processing...")
        let acc= await loadWeb3();
        if(acc== "No Wallet"){
            setBtnText("Connect")
            setShow(true)
            setIsCahnge(false);
            getMetaAddress(acc);
        }else{
            setIsCahnge(true)
            getMetaAddress(acc);
            setAccount(acc)
            setBtnText("Connect")
        }

    }
  useEffect(() => {
      return () => {
          setAccount({})
      };
  }, [])
    return (
        <div className='mainConnect container'>
            {
                show ?  <DisplayMessage show={show} handleClose={handleClose}/>  :<></>
            }
            <div className="mainMintdiv">
                <div className="innerMintdiv"><br /><br />
                <p className='ConnectdivP'>Welcome in Identity Management system</p>
                    <h1 className='ConnectDiv'>Please Connect</h1>
                    <p className='ConnectdivPP'>Connect to the Binance Test  Network (Accepted Wallet:Metamask).</p>
                    <p className='ConnectdivPP'></p>
                    <div className="btnconnecthere">
                    
                        <button 
                        onClick={getAccount}
                        className='btn btn-sm Connectbtn'>{btnText}</button>
                    </div>
                    <div className="afterconnecttext">click connect to connect your Wallet.</div>
                   <p className="Salepricetext"></p>


                </div>
            </div>


        </div>
    )
}

export default Connect
