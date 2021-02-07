import React from 'react';

export default function Summary({ children: transactions }) {
  const receitas = transactions.filter(
    (transaction) => transaction.type === '+'
  );

  const despesas = transactions.filter(
    (transaction) => transaction.type === '-'
  );

  const lancamentos = transactions.length;
  const totalReceitas = receitas.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.value;
  }, 0);
  const totalDespesas = despesas.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.value;
  }, 0);
  const saldo = totalReceitas - totalDespesas;
  const colorSaldo = saldo >= 0 ? '#27ae60' : '#c0392b';
  const { summaryStyle } = styles;
  return (
    <div style={summaryStyle}>
      <div>
        <span style={{ fontWeight: 'bold' }}>Lançamentos: </span>
        {lancamentos}
      </div>
      <div style={{ fontWeight: 'bold' }}>
        Receitas: <span style={{ color: '#27ae60' }}>R$ {totalReceitas}</span>
      </div>
      <div style={{ fontWeight: 'bold' }}>
        Despesas: <span style={{ color: '#c0392b' }}>R$ {totalDespesas}</span>
      </div>
      <div style={{ fontWeight: 'bold' }}>
        Saldo: <span style={{ color: colorSaldo }}>R$ {saldo}</span>
      </div>
    </div>
  );
}

const styles = {
  summaryStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid lightgray',
    borderRadius: '4px',
    padding: '5px',
    margin: '20px 0',
  },
};
