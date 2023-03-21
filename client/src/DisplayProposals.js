import { useState, useEffect } from "react"

function DisplayProposals({voteYesCallback, voteNoCallback, proposalsFromApp, numVotesFromApp}){
    const [proposals, setProposals] = useState([])
    const [numVotes, setNumVotes] = useState(0)

    useEffect(()=>{
        setProposals(proposalsFromApp)
        setNumVotes(numVotesFromApp)
        console.log('proposalsFromApp: ', proposalsFromApp)
        console.log('proposals: ', proposalsFromApp)
    },[proposalsFromApp, numVotesFromApp])

    const showProposal = (proposal)=>{
        return(
            <tr>
                <td>
                    <div className="row container">
                        <div className="card text-white bg-dark mb-3 max-width: 18rem;">
                            <div className="card-header">Proposal ID: {proposal.proposalId}</div>
                            <div className="card-body">
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
                </td>
            </tr>
        )
    }
    return(
        <div className="container">
            {proposals.map(showProposal)}
        </div>
    )
}
export default DisplayProposals