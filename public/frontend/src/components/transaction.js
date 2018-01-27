import React from 'react'
import styled, {keyframes} from 'styled-components'
import {lighten, darken} from 'polished'
import TimeAgo from 'react-timeago'

const humanizeAmount = amount => amount / Math.pow(10, 8)
const convertTimestamp = ts => new Date((1464109200 + ts) * 1000)

const TransactionWrapper = styled.div`
  flex: 1;
  margin-bottom: 50px;
  display: inline-block;
  min-width: 400px;
  overflow: hidden;
  border-radius: 10px;
  background: white;
`
const anim = keyframes`
  40%, 65% {
    background: #4a92ff;
  }
  50% {
    background: ${lighten(0.1, '#4a92ff')};
  }
`
const animOff = keyframes`
  from {
    background: #4a92ff;
  }
  to {
    background: #9c9c9c};
  }
`

const Header = styled.div`
  display: flex;
  padding: 10px 15px;
  color: white;
  justify-content: space-between;
  align-items: center;
  ${props =>
    props.unconfirmed
      ? `background: #4a92ff; animation: ${anim} 3s linear infinite;`
      : `background: #9c9c9c; animation: ${animOff} 1s ease-in-out`};
`

const Content = styled.div`
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;

  align-items: center;
`
const LineWrapper = styled.div`
  margin: 0 10px;
  align-items: center;
  display: flex;
`

const Line = styled.div`
  border: 1px solid #20df2e;
  color: #20df2e;
  width: 15px;
`
const ArrowLine = Line.extend`
  position: relative;
  &:after {
    position: absolute;
    content: '';
    width: 6px;
    height: 6px;
    right: -1px;
    top: -4px;
    transform: rotate(45deg);
    border-color: inherit;
    border: solid;
    border-width: 2px 2px 0 0;
  }
`
const AmountWrapper = styled.div`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  font-family: monospace;
  flex-direction: column;
`

const Amount = styled.div`
  width: 100%;
  padding: 5px 10px;
  text-align: center;
  border-radius: 0px;
  font-size: bold;
  color: white;
  background: #20df2e;
`
const Address = styled.div`
  padding: 3px 6px;
  background: rgba(0, 0, 0, 0);
  transition: all 140ms ease-in-out;
  border-radius: 3px;
  :hover {
    background: rgba(0, 0, 0, 0.05);
  }
`

const Timestamp = styled.div`
  opacity: 0.5;
  transition: opacity 300ms ease-in-out;
  :hover {
    opacity: 1;
  }
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`

const Transaction = ({data}) => (
  <TransactionWrapper>
    <Header unconfirmed={data.unconfirmed}>
      <Link target="_blank" href={`https://explorer.lisk.io/tx/${data.id}`}>
        <span>Tx {data.id}</span>
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
      <LineWrapper>
        <Line />
        <AmountWrapper>
          <Amount>{humanizeAmount(data.amount)}</Amount>
        </AmountWrapper>
        <ArrowLine />
      </LineWrapper>
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
