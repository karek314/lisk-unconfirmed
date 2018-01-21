import React from 'react'
import styled from 'styled-components'
import TimeAgo from 'react-timeago'

const humanizeAmount = amount => amount / Math.pow(10, 8)
const convertTimestamp = ts => new Date((1464109200 + ts) * 1000)

const TransactionWrapper = styled.div`
  box-shadow: 10px 10px rgba(0, 0, 0, 1);
  flex: 1;
  margin-bottom: 50px;
  display: inline-block;
  ${'' /* max-width: 1000px; */} background: #d3d3d3;
  padding: 10px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(84, 244, 197);
`

const Content = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`

const Line = styled.div`
  border: 1px solid green;
  width: 30px;
`

const Cell = styled.div`
  padding: 10px;
`

const Timestamp = styled.div`
  opacity: 0.8;
`
const AmountWrapper = styled.div`
  border-radius: 4px;
  display: flex;
  align-items: center;
  font-family: monospace;
  flex-direction: column;
  background: green;
`

const Address = styled.div``
const Amount = styled.div`
  padding: 10px 0;
`
const Fee = styled.div`
  font-size: 0.8em;
`
const Link = styled.a`
  text-decoration: none;
  color: inherit;
`

const Transaction = ({data}) => (
  <TransactionWrapper>
    <Header>
      <Cell>{data.new ? 'Pending' : ''}</Cell>
      <Link target="_blank" href={`https://explorer.lisk.io/tx/${data.id}`}>
        <Cell>ID {data.id}</Cell>
      </Link>
      <Timestamp>
        <TimeAgo date={convertTimestamp(data.timestamp)} />
      </Timestamp>
    </Header>
    <Content>
      <Link
        target="_blank"
        href={`https://explorer.lisk.io/address/${data.senderId}`}
      >
        <Address>{data.senderId}</Address>
      </Link>
      <Line />
      <AmountWrapper>
        <Amount>{humanizeAmount(data.amount)}</Amount>
        <Fee>{humanizeAmount(data.fee)} Fee</Fee>
      </AmountWrapper>
      <Line />
      <Link
        target="_blank"
        href={`https://explorer.lisk.io/address/${data.recipientId}`}
      >
        <Address>{data.recipientId}</Address>
      </Link>
    </Content>
  </TransactionWrapper>
)

export default Transaction
