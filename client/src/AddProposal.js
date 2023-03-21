import { useState } from "react"

function AddProposal({addProposalCallback}){
    const [message, setMessage] = useState("")

    return(
        <div className="container form-group">
            <div className="row text-center">
                <label for="TextArea">
                    <h2>Submit your proposal here</h2>
                </label>
            </div>
            <div className="row">
            <textarea
                className="form-control"
                id="TextArea"
                rows="3"
                onClick={()=>(document.getElementById('TextArea').value='')}
                onChange={()=>setMessage(document.getElementById('TextArea').value)}
            >
                Enter your proposal and click 'Submit proposal'
            </textarea>
            </div>
            <div className="row">
                <button
                    type="button"
                    className="btn btn-primary btn-dark"
                    onClick={()=>addProposalCallback(message)}
                >
                    Submit a proposal
                </button>
            </div>
        </div>
    )
}

export default AddProposal