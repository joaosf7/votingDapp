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
    console.log("DASS")
    let voter = await voting.methods.voters.call()
    console.log(voter)
    console.log(voter[0])
    console.log(msg.sender)
    assert.equal(accounts[1], voter(0), 'the first voter should be address at accounts[1]')
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