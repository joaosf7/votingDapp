import './App.css'
import web3 from './web3'
import AddVoter from './AddVoter'
import votingContract from './contracts/Voting'
import { useState, useEffect } from 'react'
import AddProposal from './AddProposal'

function App() {
  /*
  const contractABI = 'contracts/Voting.json'.abi
  const contractAddress = 'contracts/Voting.json'.abi.networks.11155111.address
  console.log(contractABI)
  console.log(contractAddress)
  */ 
  let voting = new web3.eth.Contract(votingContract.abi, votingContract.networks[11155111].address);

  const [voters, setVoters] = useState([]);

  useEffect(() => {
    getVotersFromContract()  
  },[]);



    async function getVotersFromContract() {
      let votersArray = []
      try {
        const ownerResult = await voting.methods.owner().call();
        console.log('Owner:', ownerResult);
        
        for(let i=0; i<await voting.methods.numberOfVoters().call(); i++){
          const voterResult = await voting.methods.voters(i).call();
          votersArray.push(voterResult)
        }
        console.log('votersArray: ', votersArray)
      } catch(e) {
        console.log(e)
      }
      setVoters(votersArray)
      console.log('Current voters array: ', voters) 
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
      let votersArray =[]
      for(let i=0; i<await voting.methods.numberOfVoters().call(); i++){
        const voterResult = await voting.methods.voters(i).call();
        votersArray.push(voterResult)
        console.log('Voter:', voterResult);
      }
      setVoters(votersArray)
      console.log(voters)
    } catch(e) {
      console.log(e)
    }
  }

  const addProposal = async (message) =>{
    try{
      await voting.methods.addProposal(message).send({from: web3.currentProvider.selectedAddress})
    }
    catch(e){
      console.log(e)
    }
  }
  return (
    <div className="container">
      <div className="row">
        <h1>Client frontend</h1>
      </div>
      <div className="row">
        <div className="col">
          TODO: Display Proposals
        </div>
        <div className="col">
          <AddProposal addProposalCallback={addProposal}/>
        </div>
      </div>
      <div className="row text-center">
        <h1>Frontend for owner of contract</h1>
        <div className="row">
          <div className="col">
            <AddVoter addVoterCallback={addVoter} votersFromApp={voters}/>
          </div>
          <div className="col">
            TODO: Component to end a proposal
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
