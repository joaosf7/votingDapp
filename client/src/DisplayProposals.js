import { useState, useEffect } from "react"

function DisplayProposals({voteYesCallback, voteNoCallback, proposalsFromApp}){
    const [proposals, setProposals] = useState([])

    useEffect(()=>{
        setProposals(proposalsFromApp)
        console.log('UseEffect from DisplayProposals')
    },[proposalsFromApp])

    const showProposal = (proposal)=>{
        let proposalStyle
        let proposalMessage='open'
        let proposalImage=''
        if(proposal.status == 'open'){
            proposalStyle = 'card-header text-light'
            proposalImage='./open-lock.svg'
        }
        else if(proposal.yesVotes >= proposal.noVotes){
            proposalStyle = 'card-header  text-secondary'
            proposalMessage='Submited proposal has passed'
            proposalImage='./lock-green.svg'
        }
        else{
            proposalStyle = 'card-header  text-light'
            proposalMessage='Submited proposal was refused'
            proposalImage='./lock-red.svg'
        }
        return(
            <div className="row container" key={proposal.proposalId}>
                <div className='card bg-dark text-secondary mb-3 max-width: 18rem'>
                    <div className={proposalStyle}>Proposal ID: {proposal.proposalId}</div>
                    <div className='card-header text-bold text-light'>
                        <div className="col">
                            Status: {proposalMessage}
                        </div>
                        <div className="col">
                            <img src={proposalImage} className="rounded float-left"/>
                        </div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title text-light">{proposal.message}</h5>
                        <div className="row text-light">
                            <div className="col">
                                <p className="card-text text-center">Yes: {proposal.yesVotes}</p>
                            </div>
                            <div className="col">
                                <p className="card-text text-center">No:   {proposal.noVotes}</p>
                            </div>
                        </div>
                        <div className="row text-light text-center">
                            <div className="col">
                                <button
                                    type="button"
                                    className="btn btn-dark btn-block"
                                    onClick={()=>voteYesCallback(proposal.proposalId)}
                                >
                                    <img src='./thumbs-up.png' width={60} height={60} className="rounded float-left"/>
                                </button>
                            </div>
                            <div className="col">
                                <button
                                    type="button"
                                    className="btn btn-dark btn-block"
                                    onClick={()=>voteNoCallback(proposal.proposalId)}
                                >
                                        <img src='./thumbs-down.png' width={60} height={60} className="rounded float-left"/> 
                                </button>
                            </div>
                        </div>
                        <p className="card-text">From: {proposal.owner}</p>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div className="container">
            {proposals.map(showProposal)}
        </div>
    )
}
export default DisplayProposals