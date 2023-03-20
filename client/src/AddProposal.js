import { useState } from "react"

function AddProposal({addProposalCallback}){
    const [message, setMessage] = useState("")

    return(
        <div className="form-group">
            <label for="TextArea">Proposal:</label>
            <textarea
                className="form-control"
                id="TextArea"
                rows="3"
                onChange={()=>setMessage(document.getElementById('TextArea').value)}
            >
                Enter your proposal and click 'Submit proposal'
            </textarea>
                <button
                    type="button"
                    className="btn btn-primary btn-dark"
                    onClick={()=>addProposalCallback(message)}
                >
                    Submit a proposal
                </button>
        </div>
    )
}

export default AddProposal