import './App.css';
import React,{useState} from 'react';
import Home from './components/Home'
import Connect from './components/Connect page/Connect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  let [isChange, setIsCahnge]=useState(false)
  let [account, setAccount] = useState()
  const getAccount = (acc) =>{
    setAccount(acc)
  }
  return (
    <div className="App">
      <ToastContainer/>
      {
        isChange ? <Home metaAddress={account} />: <Connect setIsCahnge={setIsCahnge} getMetaAddress={getAccount} />
      }
    </div>
  );
}

export default App;
