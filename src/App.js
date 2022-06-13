import { useEffect, useState } from 'react';
import './App.css';
import backgroundVideo from "./assets/background.mp4";
import nftVideo from "./assets/nftvideo.mp4";
import abi from "./contract/abi.json";
import { useMoralis } from "react-moralis";
import ReactLoading from 'react-loading';

function App() {

  const [ inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);

  const { authenticate, enableWeb3, Moralis, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  useEffect(()=>{
    if(isAuthenticated){
      enableWeb3();
    }
  },[isAuthenticated]);


  const mint = async () => {
    const sendOptions = {
      contractAddress: "0x95f7a75a719C6dd7383662234B829EC9a0054cd9",
      functionName: "mint",
      abi: abi,
      params: {
        id: 0,
        amount: 1
      },
      msgValue: 10000000000000000,
    };
    const transaction = await Moralis.executeFunction(sendOptions);
    setInProgress(true);

    await transaction.wait(3);
    setInProgress(false)
    setCompleted(true);
    // when we have minted, set In Progress to false

  };

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
  
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }


  return (
    <div className="container">
      <video className='background-video' src={backgroundVideo} width="600" height="300" autoPlay playsInline muted loop/>
      <div className='main'>
        <div className='top'>
          <div className='image-container'>
            <video className='nft-video' src={nftVideo} width="600" height="300" autoPlay playsInline muted loop/>
          </div>
          <div className='info'>
              <h2>Adidos: INTO THE METAVERSE</h2>
              <p>12 minted / 200</p>
              <div className='actions'>
                {
                  isAuthenticated
                  ? <>
                        {
                          inProgress && <ReactLoading type="bubbles" color="#fff" height={64} />
                        }
                        {
                          completed
                          ?<a target="_blank" href="https://testnets.opensea.io/collection/unidentified-contract-ggmqxx6x3s"><button className='filled-button'>
                            View On OpenSea
                          </button></a>
                          :<button onClick={mint} className='filled-button'>
                            Mint
                          </button>
                        }
                        <button onClick={logOut} className='filled-button'>
                          Start Over
                        </button>
                    </>
                  :<button onClick={login} className='filled-button'>
                    Connect Wallet
                  </button>
                }
             
              </div>
          </div>
        </div>
        <div className='footer'>
            MINTING NOW
        </div>  
      </div>
    </div>
  );
}

export default App;
