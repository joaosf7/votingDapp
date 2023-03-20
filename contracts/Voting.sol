// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
  address public owner;
  address[] public voters;
  uint public numberOfVoters;
  struct Proposal{
    address owner;
    string message;
    uint yesVotes;
    uint noVotes;
    address[] voters;
    string status;
  }
  mapping (uint => Proposal) public proposals;
  uint256 public proposalsId;

  constructor() {
    owner = msg.sender;
  }

  function addVoter(address voter) public onlyOwner{
    uint i;
    for(i=0; i<numberOfVoters && voters[i]!=voter; ++i){}
    if(i==numberOfVoters){
        voters.push(voter);
        numberOfVoters++;
    }
  }

  function checkVoters(address add) internal view returns (bool){
    for(uint i =0; i<voters.length; i++){
      if(add==voters[i])
        return true;
    }
    return false;
  }

  function checkIfAlreadyVoted(uint256 id, address voter) internal view returns (bool){
    for(uint i =0; i<proposals[id].voters.length; i++){
      if(voter==proposals[id].voters[i])
        return true;
    }
    return false;
  }

  function submitProposal(string memory message) public {
    if(checkVoters(msg.sender)){
      proposals[proposalsId].owner = msg.sender;
      proposals[proposalsId].message = message;
      proposals[proposalsId].status = 'open';
      proposalsId++;
    }
  }

  function compareStrings(string memory a, string memory b) public pure returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
}

  function vote(uint256 id, string memory message) public{
    if(checkVoters(msg.sender) && !checkIfAlreadyVoted(id, msg.sender) && compareStrings(proposals[id].status, "open")){
      if(compareStrings(message, "yes")){
        proposals[id].yesVotes++;
        proposals[id].voters.push(msg.sender);
      }
      else if(compareStrings(message, "no")){
        proposals[id].noVotes++;
        proposals[id].voters.push(msg.sender);
      }
    }
  }

  function closeProposal(uint256 id) public onlyOwner{
    proposals[id].status = 'closed';
  }

  modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
  }
}
