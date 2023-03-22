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
  const [proposalIdToClose, setProposalIdToClose] = useState()

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
    getVotersFromContract()
  }

  const addProposal = async (message) =>{
    try{
      await voting.methods.submitProposal(message).send({from: web3.currentProvider.selectedAddress})
    }
    catch(e){
      console.log(e)
    }
    getProposalsFromContract()
  }

  const voteYes = async (proposalId) =>{
    try{
      await voting.methods.vote(proposalId, 'yes').send({from: web3.currentProvider.selectedAddress})
      getProposalsFromContract()
    }
    catch(e){
      console.log(e)
    }
  }

  const voteNo = async (proposalId) =>{
    try{
      if(proposals[proposalId].status != 'closed')
        await voting.methods.vote(proposalId, 'no').send({from: web3.currentProvider.selectedAddress})
      getProposalsFromContract()
    }
    catch(e){
      console.log(e)
    }
  }

  const closeProposal = async (proposalIdToClose) => {
    try{
      await voting.methods.closeProposal(proposalIdToClose).send({from: web3.currentProvider.selectedAddress})
      getProposalsFromContract()
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <div className="container-fluid bg-dark bg-gradient text-light" data-bs-theme="dark" height='150'>

<div className="row text-center align-items-center justify-content-center">
  <div className='col-auto text-center'>
    <img src="./logo.avif" className="rounded float-left" height='50' width='50' alt="..." /><h1 className='font-weight-bold mb-0'>VotingDapp</h1>
  </div>
</div>

      <div className="row">
        <div className="col">
          <DisplayProposals voteYesCallback={voteYes} voteNoCallback={voteNo} proposalsFromApp={proposals}/>
        </div>
        <div className="col">
          <div className='row'>
            <AddProposal addProposalCallback={addProposal}/>
          </div>
          <div className='row'>
            <div className="col text-center">
              <h2 className='text-light'>The features below are restricted to the contract owner only</h2>
                <div className="row">
                  <div className="col-6">
                    <AddVoter addVoterCallback={addVoter} votersFromApp={voters}/>
                  </div>
                  <div className="col-4 container">
                    <form>
                        <div className="form-group">
                          <label className='text-bold' for="inputProposalToClose">Proposal to close</label>
                          <input type="input"
                            className="form-control text-light bg-dark "
                            id="inputProposalToClose"
                            placeholder="Enter ID of the proposal you want to close"
                            onChange={(e) => setProposalIdToClose(e.target.value)}
                            onClick={(e) => (e.target.value='')}
                          />
                      </div>
                      <button
                        type="button" //type='submit'
                        className="btn btn-primary"
                        onClick={()=>closeProposal(proposalIdToClose)}>
                          Submit
                      </button>
                    </form>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
