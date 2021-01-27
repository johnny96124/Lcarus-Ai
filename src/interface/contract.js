 

import   Web3  from 'web3'

const minterface = require('./CortexArtAbi.json')
const mainAddress = '0xF013F34d6243D215cB79BEC734664D8503dB9774' 

 let  obj  = {
  web3: {},
  managerContract: {}
}

if (window.ctxWeb3) {
  const web3 =  new Web3(window.ctxWeb3.currentProvider)
  const managerContract = new web3.eth.Contract(minterface, mainAddress)
  obj = {web3, managerContract}
}

export const web3Object = {...obj}