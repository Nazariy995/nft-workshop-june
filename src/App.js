import logo from './logo.svg';
import './App.css';
import backgroundVideo from "./assets/background.mp4";
import nftVideo from "./assets/nftvideo.mp4";

function App() {
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
                <button className='filled-button'>
                  Connect Wallet
                </button>
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
