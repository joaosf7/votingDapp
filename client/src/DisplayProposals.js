import { useState, useEffect } from "react"

function DisplayProposals({voteYesCallback, voteNoCallback, proposalsFromApp}){
    const [proposals, setProposals] = useState([])

    useEffect(()=>{
        setProposals(proposalsFromApp)
        console.log('proposalsFromApp: ', proposalsFromApp)
    },[proposalsFromApp])

    const showProposal = (proposal)=>{
        let bgStyle
        if(proposal.status == 'open')
            bgStyle = 'card text-white bg-dark mb-3 max-width: 18rem'
        else if(proposal.yesVotes >= proposal.noVotes)
            bgStyle = 'card text-white bg-success mb-3 max-width: 18rem'
        else
            bgStyle = 'card text-white bg-danger mb-3 max-width: 18rem'
        return(
            <div className="row container">
                <div className={bgStyle}>
                    <div className="card-header">Proposal ID: {proposal.proposalId} {proposal.status}</div>
                    <div className="card-body"  rows='4'>
                        <h5 className="card-title">{proposal.message}</h5>
                        <div className="row">
                            <div className="col">
                                <p className="card-text">Yes: {proposal.yesVotes}</p>
                            </div>
                            <div className="col">
                                <button
                                    type="button"
                                    className="btn btn-success btn-block"
                                    onClick={()=>voteYesCallback(proposal.proposalId)}>
                                        Aprove this proposal
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p className="card-text">No:   {proposal.noVotes}</p>
                            </div>
                            <div className="col">
                                <button
                                    type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={()=>voteNoCallback(proposal.proposalId)}>
                                        Reject this proposal  
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