import React from 'react';

export default function Transaction({ children: transaction, onActionClick }) {
  const {
    transactionStyle,
    transactionDescription,
    transactionDay,
    transactionValue,
    transactionActions,
    transactionIcon,
  } = styles;
  const borderColor = transaction.type === '+' ? '#27ae60' : '#c0392b';

  const handleEditClick = () => {
    onActionClick('edit', transaction);
  };
  const handleDeleteClick = () => {
    onActionClick('delete', transaction);
  };

  return (
    <div
      style={{ ...transactionStyle, borderLeft: `8px solid ${borderColor}` }}
    >
      <div style={transactionDay}>
        <span>{`${transaction.day < 10 ? '0' : ''}${transaction.day}`}</span>
      </div>
      <div style={transactionDescription}>
        <span style={{ fontSize: '1.3rem' }}>
          <strong>{transaction.category}</strong>
        </span>
        <span>{transaction.description}</span>
      </div>
      <div style={{ ...transactionValue, color: borderColor }}>
        <span>R$ {transaction.value.toFixed(2)}</span>
      </div>
      <div style={transactionActions}>
        <span onClick={handleEditClick}>
          <i className="material-icons" style={transactionIcon}>
            edit
          </i>
        </span>
        <span onClick={handleDeleteClick}>
          <i className="material-icons" style={transactionIcon}>
            delete
          </i>
        </span>
      </div>
    </div>
  );
}

const styles = {
  transactionStyle: {
    padding: '10px',
    margin: '5px',
    border: '1px solid lightgray',
    borderRadius: '4px',
    // fontFamily: 'Consolas',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  transactionDay: {
    marginRight: '10px',
    fontSize: '1.5rem',
    fontWeight: '500',
  },
  transactionDescription: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    flexGrow: 1,
  },
  transactionValue: {
    fontSize: '1.8rem',
    fontStyle: 'bold',
    marginRight: '15px',
  },
  transactionActions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'center',
  },
  transactionIcon: {
    cursor: 'pointer',
    margin: '2px',
  },
};
