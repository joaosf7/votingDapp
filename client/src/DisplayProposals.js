import { useState, useEffect } from "react"

function DisplayProposals({voteYesCallback, voteNoCallback, proposalsFromApp}){
    const [proposals, setProposals] = useState([])

    useEffect(()=>{
        setProposals(proposalsFromApp)
        console.log('proposalsFromApp: ', proposalsFromApp)
    },[proposalsFromApp])

    const showProposal = (proposal)=>{
        let closedStyle
        if(proposal.status == 'open'){
            closedStyle = 'card-header'
            console.log("ESTOU AQUI")
        }
        else if(proposal.yesVotes >= proposal.noVotes)
            closedStyle = 'card-header bg-success text-light'
        else
            closedStyle = 'card-header bg-danger text-light'
        return(
            <div className="row container" key={proposal.proposalId}>
                <div className='card bg-dark text-secondary mb-3 max-width: 18rem'>
                    <div className={closedStyle}>Proposal ID: {proposal.proposalId}</div>
                    <div className='card-header text-bold text-light'>Status: {proposal.status}</div>
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
                                    className="btn btn-success btn-block"
                                    onClick={()=>voteYesCallback(proposal.proposalId)}>
                                        Aprove this proposal
                                </button>
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