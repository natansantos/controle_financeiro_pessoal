import React from 'react';
import Transaction from './Transaction';

export default function Transactions({
  children: transactions,
  onPersist,
  onDelete,
}) {
  const handleClick = (type, transaction) => {
    if (type === 'edit') {
      onPersist(type, transaction);
    } else {
      onDelete(transaction);
    }
  };
  return (
    <div>
      {transactions
        .sort((a, b) => a.day - b.day)
        .map((transaction) => {
          return (
            <Transaction key={transaction._id} onActionClick={handleClick}>
              {transaction}
            </Transaction>
          );
          // return <p key={transaction._id}>{transaction.description}</p>;
        })}
    </div>
  );
}
