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
      getVotersFromContract();
      getProposalsFromContract();
    console.log('UseEffect from App')
  },[])



  const getProposalsFromContract = async ()=>{
    let proposalsArray = []
    try {
      for(let i=0; i<await voting.methods.proposalsId().call(); i++){
        const proposalResult = await voting.methods.proposals(i).call();
        proposalsArray.push(proposalResult)
      }
      } catch(e) {
        console.log(e)
      }
      setProposals(proposalsArray)
  }

  const getVotersFromContract = async ()=>{
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
      if(proposals[proposalId].status !== 'closed')
      await voting.methods.vote(proposalId, 'yes').send({from: web3.currentProvider.selectedAddress})
      getProposalsFromContract()
    }
    catch(e){
      console.log(e)
    }
  }

  const voteNo = async (proposalId) =>{
    try{
      if(proposals[proposalId].status !== 'closed')
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
//data-bs-theme="dark" bg-dark bg-gradient
  return (
    <div className="container-fluid  bg-image text-light"  height='150'>
      <div className="row text-center justify-content-center w-25 h-80">
          <img src="./logo-header.png" className="rounded float-left" height='100' width='300' alt="..." />
      </div>
      <div className="row">
        <div className="col-4">
          <DisplayProposals voteYesCallback={voteYes} voteNoCallback={voteNo} proposalsFromApp={proposals}/>
        </div>
        <div className="col-8">
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
                          <label className='text-bold' htmlFor="inputProposalToClose">Proposal to close</label>
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
