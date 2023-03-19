/*
 * Testing script for VendingMachine contract
 */
const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  before(async () =>{
    voting = await Voting.deployed()
  })

  it('ensures that a voter can be inserted', async () =>{
    await voting.addVoter(accounts[1])
    let voter = await voting.voters(0)
    assert.equal(accounts[1], voter, 'the first voter should be address at accounts[1]')
  })

  it('ensures only owner of smart contract can add a voter', async ()=>{
    const REVERT = "VM Exception while processing transaction: revert"
    try {
      await voting.addVoter(accounts[1], {from: accounts[1]})
      throw null;
    }
    catch (error) {
      assert(error, "Expected an error but did not get one");
      assert(error.message.startsWith(REVERT), "Expected '" + REVERT + "' but got '" + error.message + "' instead");
    }
  })

  it('ensures more than one voter can be part of the company', async ()=>{
    await voting.addVoter(accounts[2])
    let voter = await voting.voters(1)
    assert.equal(accounts[2], voter, 'the second voter should be address at accounts[2]')
  })

  it('voter can submit a proposal', async ()=>{
    await voting.submitProposal("Test Proposal 1", {from: accounts[1]})
    let receivedMessage = (await voting.proposals(0)).message
    assert.equal(
      "Test Proposal 1",
      receivedMessage,
      'The received message should be: Test Proposal 1'
    )
  })

  it('voter can submit more than one proposal', async ()=>{
    await voting.submitProposal("Test Proposal 2", {from: accounts[1]})
    let receivedMessage = (await voting.proposals(1)).message
    assert.equal(
      "Test Proposal 2",
      receivedMessage,
      'The received message should be: Test Proposal 2'
    )
  })

  it('only allows a voter to submit a proposal', async ()=>{
    // accounts[0] is the owner and not a voter, so he should not be able to submit a proposal
    await voting.submitProposal("This is the second proposal")
    let receivedMessage = (await voting.proposals(2)).message
    assert.equal(
      '',
      receivedMessage,
      'Should receive empty string.'
    )
  })

  it('ensures voters can vote', async ()=>{
    await voting.vote(0, "yes", {from: accounts[1]})
    let vote = (await voting.proposals(0)).yesVotes
    assert.equal(1, vote, 'Number of yes votes should be equal to 1')
  })

  it('ensures only voters can vote', async ()=>{
    await voting.vote(0, "yes")
    let vote = (await voting.proposals(0)).yesVotes
    assert.equal(1, vote, 'Number of yes votes should be equal to 1')
  })

  it('ensures voters cant vote more than one time', async ()=>{
    await voting.vote(0, "yes", {from: accounts[1]})
    let vote = (await voting.proposals(0)).yesVotes
    assert.equal(1, vote, 'Number of yes votes should be equal to 1')
  })

  it('ensures votes increment', async ()=>{
    await voting.vote(0, "yes", {from: accounts[2]})
    let vote = (await voting.proposals(0)).yesVotes
    assert.equal(2, vote, 'Number of yes votes should be equal to 2')
  })

  it('ensures owner can close a proposal', async ()=>{
    await voting.closeProposal(0)
    let status = (await voting.proposals(0)).status
    assert.equal('closed', status, 'Status of first proposal should be: closed')
  })

  it('ensures only the owner can close a proposal', async ()=>{
    try{
      await voting.closeProposal(1, {from: accounts[1]})
    }
    catch(err){
      let status = (await voting.proposals(1)).status
      assert.equal('open', status, 'Status of second proposal should be: open')
    }
  })

  it('ensures voters cant vote after closed proposal', async ()=>{
    await voting.addVoter(accounts[3])
    await voting.vote(0, "yes", {from: accounts[3]})
    let vote = (await voting.proposals(0)).yesVotes
    assert.equal(2, vote, 'Number of yes votes should be equal to 2')
  })

/*
  it('ensures that the balance of the vending machine can be updated', async () =>{
    await vm.restock(100)
    let balance = await voting.getVendingMachineBalance()
    assert.equal(balance, 200, 'the  balance should be 200 donuts after restocking.')
  })

  it('allows donuts to be purchased', async () =>{
    // absintu: cost instead of 2 ether like example, because of the current cost of Ether from testnets
    //          we will use 2 dollars for 1 good and tasty donut
    //          at 12/03/2023 2 dollars equals 1304159290015600 wei
    // await vm.purchase(1, {from: accounts[0], value: web3.utils.toWei('2', 'ether')})
    await voting.purchase(1, {from: accounts[0], value: 1304159290015600})
    let balance = await voting.getVendingMachineBalance()
    assert.equal(balance, 199, 'the  balance should be 199 donuts after sale.')
  })
  */
});