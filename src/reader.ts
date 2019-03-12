import IWeb3 from 'web3'
import { getWeb3, stopWeb3 } from './web3.js'
import { Contract as ContractInstance } from 'web3-eth-contract/types'
import { AbiItem } from 'web3-utils/types'

const abi:AbiItem[] = require('../fixtures/BasicToken.json')

export type StatsAboutTheToken = {
  totalSupply: string
}

if (!module.parent) {
  const _web3:IWeb3 = getWeb3('http://127.0.0.1:8545')

  getAllTheStats(_web3)
    .catch(e => console.error(e))
    .finally(() => stopWeb3(_web3))
}

// functions

export async function getAllTheStats(web3:IWeb3):Promise<StatsAboutTheToken> {
  console.log(`Using remote Ethereum node at ${web3.currentProvider.host}`)
  console.log("Connected peers:", await web3.eth.net.getPeerCount())
  console.log()

  const lookupBalanceOfThisAddress = '0x7B617e97ed4EC657058e7b4a5985110B5195Dc9A'
  const deployedToken = '0xf93468d7F8C59c9514fC8053AD4a8268D62993e7'

  const basicToken:ContractInstance = new web3.eth.Contract(abi,deployedToken)

  console.log('On basicToken.methods we should be able to interact with these methods of the Contract')
  console.log("  " +abi.map(method => method.name).join(', '))
  console.log()

  const totalSupply:any = await basicToken.methods.totalSupply().call()
  console.log('basicToken.methods.totalSupply()')
  console.log('  ' + totalSupply)

  const balance:any = await basicToken.methods.balanceOf(lookupBalanceOfThisAddress).call()
  console.log(`basicToken.methods.balanceOf(${lookupBalanceOfThisAddress})`)
  console.log('  ' + balance)

  return <StatsAboutTheToken>{
    totalSupply: totalSupply.toString()
  }
}

