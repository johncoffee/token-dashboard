import { getWeb3, stopWeb3 } from '../src/web3.js'
import { getAllTheStats, } from '../src/reader.js'
import IWeb3 from 'web3'
import test = require('tape')

const _web3:IWeb3 = getWeb3('http://127.0.0.1:8545')

test.onFinish(() => stopWeb3(_web3))

test('timing test', async t => {
  t.plan(1) // one async task ahead..

  const stats = await getAllTheStats(_web3)
  t.ok(!!stats.totalSupply, "there should be a totalSupply")
})

