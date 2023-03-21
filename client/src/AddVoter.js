import { useEffect, useState } from 'react';

function AddVoter({addVoterCallback, votersFromApp}) {
    const [address, setAddress] = useState("")
    const [voters, setVoters] = useState([])
    
    useEffect(()=>{
        setVoters(votersFromApp)
        console.log('votersFromApp: ', votersFromApp)
        console.log('voters: ', voters)
    })

    const showVoter = (voter)=>{
        return(
            <tr>
                <td>{voter}</td>
            </tr>
        )
    }
    return (
      <div className="container">
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                <th scope="col">List of voter addresses</th>
                </tr>
            </thead>
            <tbody>{voters.map(showVoter)}</tbody>
        </table>
        <div className="row row-dark">
            <div className="col"></div>
                <input className="bg-secondary text-light" value ={address} onChange={(e) => setAddress(e.target.value)}/>
                <button
                    type="button"
                    className="btn btn-primary btn-dark"
                    onClick={()=>addVoterCallback(address)}
                >
                    Add a voter
                </button>
            </div>
            <div className="col">
                
            </div>
        </div>
    );
  }
  
  export default AddVoter;