import './App.css'
import web3 from './web3'
import AddVoter from './AddVoter'
import votingContract from './contracts/Voting'
import { useState, useEffect } from 'react'
import AddProposal from './AddProposal'
import DisplayProposals from './DisplayProposals'

function App() {
  let voting = new web3.eth.Contract(votingContract.abi, votingContract.networks[11155111].address);

  const [voters, setVoters] = useState([])
  const [proposals, setProposals] = useState([])
  const [count, setCount] =useState(1)

  useEffect(() => {
    getVotersFromContract()
    getProposalsFromContract()
  },[])



  async function getProposalsFromContract() {
    let proposalsArray = []
    try {
      for(let i=0; i<await voting.methods.proposalsId().call(); i++){
        const proposalResult = await voting.methods.proposals(i).call();
        proposalsArray.push(proposalResult)
      }
      console.log('proposalsArray: ', proposalsArray)
      } catch(e) {
        console.log(e)
      }
      setProposals(proposalsArray)
  }

  async function getVotersFromContract() {
    let votersArray = []
    try {
      for(let i=0; i<await voting.methods.numberOfVoters().call(); i++){
        const voterResult = await voting.methods.voters(i).call();
        votersArray.push(voterResult)
      }
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
      await voting.methods.submitProposal(message).send({from: web3.currentProvider.selectedAddress})
    }
    catch(e){
      console.log(e)
    }
    try {
      let proposalArray =[]
      for(let i=0; i<await voting.methods.proposalsId().call(); i++){
        const proposalResult = await voting.methods.proposals(i).call();
        proposalArray.push(proposalResult)
        console.log('proposalResult:', proposalResult);
      }
      setProposals(proposalArray)
      console.log(proposals)
    } catch(e) {
      console.log(e)
    }
  }

  const voteYes = async (proposalId) =>{
    try{
      await voting.methods.vote(proposalId, 'yes').send({from: web3.currentProvider.selectedAddress})
      
    }
    catch(e){
      console.log(e)
    }
    setCount(count+1)
  }

  const voteNo = async (proposalId) =>{
    try{
      await voting.methods.vote(proposalId, 'no').send({from: web3.currentProvider.selectedAddress})
      
    }
    catch(e){
      console.log(e)
    }
    setCount(count+1)
  }

  return (
    <div className="container bg-dark bg-gradient text-light">
      <div className="row text-center">
        <h1>Client frontend</h1>
      </div>
      <div className="row">
        <div className="col">
          <DisplayProposals voteYesCallback={voteYes} voteNoCallback={voteNo} proposalsFromApp={proposals} numVotesFromApp={count}/>
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
