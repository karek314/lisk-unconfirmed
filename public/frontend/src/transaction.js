import React from 'react'

const Transaction = ({ data }) => (
  <tr>
    <td>{data.id}</td>
    <td>{data.amount}</td>
    <td>{data.fee}</td>
    <td>{data.timestamp}</td>
    <td>{data.senderId}</td>
    <td>{data.recipientId}</td>
  </tr>
)

export default Transaction
