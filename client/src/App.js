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
  let voting = new web3.eth.Contract(votingContract.abi, votingContract.networks[11155111].address);

  var voters = [];

  const init = async () => {
    try {
      const ownerResult = await voting.methods.owner().call();
      console.log('Owner:', ownerResult);
      for(let i=0; i<await voting.methods.numberOfVoters().call(); i++){
        const voterResult = await voting.methods.voters(i).call();
        console.log('Voter:', voterResult);
        voters.push(voterResult)
      }
    } catch(e) {
      console.log(e);
    }
  }

  const addVoter = async (address) => {
    try{
      await voting.methods.addVoter(address).send({from: web3.currentProvider.selectedAddress})
    }
    catch(e){
      console.log(e)
    }
    try {
      const ownerResult = await voting.methods.owner().call();
      console.log('Owner:', ownerResult);
      for(let i=0; i<await voting.methods.numberOfVoters().call(); i++){
        const voterResult = await voting.methods.voters(i).call();
        console.log('Voter:', voterResult);
        voters.push(voterResult)
      }
    } catch(e) {
      console.log(e);
    }
  }
  // Call init function when the app is first loaded
  init();
  return (
    <div className="container">
      <div className="row">
        Client frontend
      </div>
      <div className="row text-center">
        <h1>Frontend for owner of contract</h1>
          <div className="col">
            <AddVoter addVoterCallback={addVoter} updatedVoters={voters}/>
          </div>
          <div className="col">
            
          </div>
      </div>
    </div>
  );
}

export default App;
