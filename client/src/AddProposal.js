import { useState } from "react"

function AddProposal({addProposalCallback}){
    const [message, setMessage] = useState("")

    return(
        <div className="container form-group">
            <div className="row text-center">
                
            </div>
            <div className="row">
            <textarea
                className="form-control border border-dark  bg-secondary text-light"
                id="TextArea"
                rows="8"
                defaultValue='Enter your proposal and click Submit a proposal'
                onClick={()=>(document.getElementById('TextArea').value='')}
                onChange={()=>setMessage(document.getElementById('TextArea').value)}
            ></textarea>
            </div>
            <div className="row">
                <div className="col text-center">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={()=>addProposalCallback(message)}
                    >
                        Submit a proposal
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddProposal