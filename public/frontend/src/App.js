import React, { Component } from 'react'
import axios from 'axios'

import Transaction from './transaction'

class App extends Component {
  state = {
    transactions: []
  }
  componentDidMount() {
    this.loadTransactions()
    setInterval(() => {
      this.loadTransactions()
    }, 1500)
  }
  loadTransactions = async () => {
    const res = await axios.get(
      //  'http://www.mocky.io/v2/5a5f83cc2e000080260a84ca'
      'https://unconfirmed.liskstats.net/api/index.php'
    )

    if (res.data.transactions.length >= 0) {
      const uniqueResultOne = res.data.transactions
        .filter(
          obj => !this.state.transactions.some(obj2 => obj.id === obj2.id)
        )
        .map(t => ({
          ...t,
          new: true
        }))
        .sort((a, b) => b.timestamp - a.timestamp)
      if (uniqueResultOne.length >= 1) this.addNewTransactions(uniqueResultOne)
    }
  }
  addNewTransactions = newTransactions => {
    const oldTx = this.state.transactions.map(t => ({
      ...t,
      new: false
    }))
    this.setState({
      transactions: [...newTransactions, ...oldTx]
    })
  }
  render() {
    const { transactions } = this.state
    return (
      <div>
        <h1>Transactions</h1>
        <table>
          <tbody>
            {transactions.map(t => <Transaction key={t.id} data={t} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
