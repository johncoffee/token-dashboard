import IWeb3 from 'web3/types'
import { HttpProvider } from 'web3-providers/types'
import { Web3ModuleOptions } from 'web3-core/types'

const Web3 = require('web3')

export function stopWeb3(web3:IWeb3) {
  try {
    const provider = web3.currentProvider as HttpProvider
    provider.disconnect()
  }
  catch (e) {
    console.log(e.message)
  }
}

export function getWeb3 (_provider?:string, options?:Web3ModuleOptions):IWeb3 {
  options = {
    // defaultAccount: '0x0',
    // defaultBlock: 'latest',
    // defaultGas: 1,
    // defaultGasPrice: 0,
    // transactionBlockTimeout: 50,
    // transactionConfirmationBlocks: 24,
    // transactionPollingTimeout: 480,
    // transactionSigner: new CustomTransactionSigner(),
    ...options,
  }
  const web3:IWeb3 = new Web3(_provider, options)
  return web3
}

