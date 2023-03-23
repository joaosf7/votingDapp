import Web3 from 'web3'

let web3

if (window.ethereum) {
    web3 = new Web3(window.ethereum)
   try {
       // Request account access
        window.ethereum.request({ method: 'eth_requestAccounts'})
   } catch(e) {
      // User has denied account access to DApp...
      // alert('Cant use window.ethereum !');
   }
}
// Legacy DApp Browsers
else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
}
// Non-DApp Browsers
else {
    alert('You have to install MetaMask !');
}

export default web3;