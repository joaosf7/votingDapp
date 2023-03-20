import { useState } from 'react';

function AddVoter({addVoterCallback, updatedVoters}) {
    const [address, setAddress] = useState("")
    const [voters, setVoters] = useState("")

    return (
      <div className="container">
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">List of voters</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>{voters[0]}</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>0x5D448002B2160aa0A7f59B6292aAC11424F7aDA8</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>0x5D448002B2160aa0A7f59B6292aAC11424F7aDA8</td>
                </tr>
            </tbody>
        </table>
        <div className="row row-dark">
            <div className="col"></div>
                <input value ={address} onChange={(e) => setAddress(e.target.value)}/>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={()=>addVoterCallback(address)}
                >
                    Add Voter
                </button>
            </div>
            <div className="col">
                
            </div>
        </div>
    );
  }
  
  export default AddVoter;