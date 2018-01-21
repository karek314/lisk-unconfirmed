import React, {Component} from 'react'
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

    const unconfirmed = res.data.transactions.map(t => ({
      ...t,
      unconfirmed: true
    }))

    const oldTx = this.state.transactions
      .filter(obj => !res.data.transactions.some(obj2 => obj.id === obj2.id))
      .map(t => ({
        ...t,
        unconfirmed: false
      }))

    this.setState({
      transactions: [...unconfirmed, ...oldTx]
    })
  }

  render() {
    const {transactions} = this.state
    return (
      <div>
        <h1>Transactions</h1>
        <ul>{transactions.map(t => <Transaction key={t.id} data={t} />)}</ul>
      </div>
    )
  }
}

export default App
