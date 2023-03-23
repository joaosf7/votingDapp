import { useState } from 'react';

function AddVoter({addVoterCallback, votersFromApp}) {
    const [address, setAddress] = useState("")

    const showVoter = (voter, index)=>{
        return(
            <tr key={index}>
                <th scope="row">{index}</th>
                <td>{voter}</td>
                {console.log('showVoter from AdVoter')}
            </tr>
        )
    }
    return (
      <div className="container">
        <table className="table table-striped table-dark table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">List of voter addresses</th>
                </tr>
            </thead>
            <tbody>{votersFromApp.map(showVoter)}</tbody>
        </table>
        <div className="row row-dark">
            <div className="col"></div>
                <input className="bg-secondary text-light" value ={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onClick={(e) => (e.target.value='')}/>
                <div className='col text-center'>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={()=>addVoterCallback(address)}
                    >
                        Add a voter
                    </button>
                </div>
            </div>
        </div>
    );
  }
  
  export default AddVoter;