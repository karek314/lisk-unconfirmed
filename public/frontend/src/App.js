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
    }, 1000)
  }
  loadTransactions = async () => {
    const res = await axios.get(
      //  'http://www.mocky.io/v2/5a5f83cc2e000080260a84ca'
      'https://cors.now.sh/https://unconfirmed.liskstats.net/api/index.php'
    )

    if (res.data.transactions.length >= 0) {
      const all = [...res.data.transactions, ...this.state.transactions]
      const unique = all.filter(
        (s1, pos, arr) => arr.findIndex(s2 => s2.id === s1.id) === pos
      )

      this.setState({
        transactions: unique
      })
      console.log(res.data)
      console.log(this.state)
    }
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
