import { useState } from "react"

function AddProposal({addProposalCallback}){
    const [message, setMessage] = useState("")

    return(
        <div className="container form-group">
            <div className="row text-center">
                <label for="TextArea">
                    <h2 className='text-light'>Submit your proposal here</h2>
                </label>
            </div>
            <div className="row">
            <textarea
                className="form-control border border-dark  bg-secondary text-light"
                id="TextArea"
                rows="8"
                onClick={()=>(document.getElementById('TextArea').value='')}
                onChange={()=>setMessage(document.getElementById('TextArea').value)}
            >
                Enter your proposal and click 'Submit proposal'
            </textarea>
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