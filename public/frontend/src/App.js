import React, {Component} from 'react'
import axios from 'axios'
import FlipMove from 'react-flip-move'

import Transaction from './components/transaction'
import Header from './components/header'

const enterAnimation = {
  from: {opacity: 0, transform: 'scale(0.9) translateY(30px)'},
  to: {opacity: 1, transform: 'scale(1)  translateY(0)'}
}

const easing = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'

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
      // 'http://www.mocky.io/v2/5a5f83cc2e000080260a84ca'
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
        <Header />
        {transactions.length == 0 && <h5>Listening for transactions...</h5>}
        <FlipMove
          staggerDurationBy="30"
          duration={500}
          easing={easing}
          enterAnimation={enterAnimation}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {transactions.map(t => (
            <div
              style={{
                display: 'inline-block',
                alignText: 'center',
                margin: '0 auto'
              }}
              key={t.id}
            >
              <Transaction data={t} />
            </div>
          ))}
        </FlipMove>
      </div>
    )
  }
}

export default App
