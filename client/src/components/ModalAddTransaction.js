import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalTransaction({ onClose, onSave }) {
  const [transactionDescription, setTransactionDescription] = useState('');
  const [transactionValue, setTransactionValue] = useState('');
  const [transactionCategory, setTransactionCategory] = useState('');
  const [transactionYearMonthDay, setTransactionYearMonthDay] = useState('');
  const [transactionType, setTransactionType] = useState('+');

  const handleModalClose = () => {
    onClose(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      description: transactionDescription,
      value: parseFloat(transactionValue),
      category: transactionCategory,
      year: parseInt(transactionYearMonthDay.substring(0, 4)),
      month: parseInt(transactionYearMonthDay.substring(5, 7)),
      day: parseInt(transactionYearMonthDay.substring(8, 10)),
      yearMonth: transactionYearMonthDay.substring(0, 7),
      yearMonthDay: transactionYearMonthDay,
      type: transactionType,
    };
    console.log(formData);
    onSave(formData);
  };

  const handleDescriptionChange = (e) => {
    setTransactionDescription(e.target.value);
  };
  const handleValueChange = (e) => {
    setTransactionValue(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setTransactionCategory(e.target.value);
  };
  const handleYearMonthDayChange = (e) => {
    setTransactionYearMonthDay(e.target.value);
  };
  const handleTypeChange = (e) => {
    console.log(e.target.value);
    setTransactionType(e.target.value);
  };

  return (
    <div>
      <Modal isOpen={true} style={styles}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Adicionar Transação</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>
        <form onSubmit={handleFormSubmit} style={styles.form}>
          <div className="input-field" style={styles.radio}>
            <span>
              <label>
                <input
                  name="group1"
                  type="radio"
                  value="+"
                  onChange={handleTypeChange}
                  checked={transactionType === '+'}
                />
                <span>Receita</span>
              </label>
            </span>
            <span>
              <label>
                <input
                  name="group1"
                  type="radio"
                  value="-"
                  onChange={handleTypeChange}
                  checked={transactionType === '-'}
                />
                <span>Despesa</span>
              </label>
            </span>
          </div>

          <div className="input-field">
            <input
              id="inputDescription"
              type="text"
              value={transactionDescription}
              onChange={handleDescriptionChange}
            />
            <label className="active" htmlFor="inputDescription">
              Descrição:
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputCategory"
              type="text"
              value={transactionCategory}
              onChange={handleCategoryChange}
            />
            <label className="active" htmlFor="inputCategory">
              Categoria:
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputValue"
              type="text"
              value={transactionValue}
              onChange={handleValueChange}
            />
            <label className="active" htmlFor="inputValue">
              Valor:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputYearMonthDay"
              type="text"
              value={transactionYearMonthDay}
              onChange={handleYearMonthDayChange}
            />
            <label className="active" htmlFor="inputYearMonthDay">
              Data:
            </label>
          </div>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Salvar
            <i className="material-icons right">send</i>
          </button>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },

  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },

  content: {},

  radio: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  form: {
    border: '1px solid lightgray',
    borderRadius: '4px',
    padding: '20px',
  },
};
