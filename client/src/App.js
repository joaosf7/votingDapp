import './App.css'
import web3 from './web3'
import AddVoter from './AddVoter'
import votingContract from './contracts/Voting'

function App() {
  /*
  const contractABI = 'contracts/Voting.json'.abi
  const contractAddress = 'contracts/Voting.json'.abi.networks.11155111.address
  console.log(contractABI)
  console.log(contractAddress)
  */
  const contractAddress = votingContract.networks[11155111].address
  let votingInstance = new web3.eth.Contract(votingContract.abi, contractAddress);

  const addVoter = async (address) => {
    try{
      await votingInstance.methods.addVoter(address).send({from: web3.currentProvider.selectedAddress})
    }
    catch(e){
      console.log(e)
    }
  }
  
  return (
    <div className="container">
      <div className="row">
        Client frontend
      </div>
      <div className="row text-center">
        <h1>Frontend for owner of contract</h1>
          <div className="col">
            <AddVoter addVoterCallback={addVoter}/>
          </div>
          <div className="col">
            
          </div>
      </div>
    </div>
  );
}

export default App;
