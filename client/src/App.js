import React, { useEffect, useState } from 'react';
import Select from './components/Select';
import Transactions from './components/Transactions';
import * as api from './api/apiService';
import Summary from './components/Summary';
import Controls from './components/Controls';
import ModalTransaction from './components/ModalTransaction';
import ModalAddTransaction from './components/ModalAddTransaction';

export default function App() {
  const [selectedPeriod, setSelectetPeriod] = useState('2021-02');
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({
    _id: '',
    description: '',
    value: '',
    category: '',
    type: '',
    yearMonthDay: '',
  });
  const [modalTitle, setModalTitle] = useState('Adicionar Transação');

  useEffect(() => {
    const getTransactions = async () => {
      const newTransactions = await api.getTransactions(selectedPeriod);

      setTransactions([...newTransactions.data]);
      setFilter('');
      setFilteredTransactions([...newTransactions.data]);
    };
    getTransactions();
  }, [selectedPeriod]);

  useEffect(() => {
    // console.log(filteredTransactions);
  }, [filteredTransactions]);

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      return transaction.description
        .toLowerCase()
        .includes(filter.toLowerCase());
    });
    setFilteredTransactions(filtered);
  }, [filter, transactions]);

  const handlePeriodChange = (period) => {
    setSelectetPeriod(period);
  };

  const handleChangeFilter = (filter) => {
    setFilter(filter);
  };

  const handlePersist = (type, transaction) => {
    setSelectedTransaction(transaction);
    if (type === 'edit') {
      setIsModalOpen(true);
    } else {
      setIsModalAddOpen(true);
    }
  };
  /*
  const handleUpdateData = async (formData) => {
    const { id, newValue } = formData;

    const newGrades = Object.assign([], allGrades);

    const gradeToPersist = newGrades.find((grade) => grade.id === id);
    gradeToPersist.value = newValue;

    if (gradeToPersist.isDeleted) {
      gradeToPersist.isDeleted = false;
      await api.insertGrade(gradeToPersist);
    } else {
      await api.updateGrade(gradeToPersist);
    }

    setIsModalOpen(false);
  };*/
  const handleUpdateData = async (formData) => {
    const {
      _id,
      description,
      value,
      category,
      type,
      yearMonthDay,
      year,
      month,
      day,
    } = formData;
    const newTransactions = [...transactions];
    const transactionToPersist = newTransactions.find(
      (transaction) => transaction._id === _id
    );
    transactionToPersist.description = description;
    transactionToPersist.value = value;
    transactionToPersist.category = category;
    transactionToPersist.type = type;
    transactionToPersist.yearMonthDay = yearMonthDay;
    transactionToPersist.year = year;
    transactionToPersist.month = month;
    transactionToPersist.day = day;

    if (transactionToPersist) {
      await api.updateTransaction(formData);
      // console.log(response);
    }
    const getTransactions = async () => {
      const newTransactions = await api.getTransactions(selectedPeriod);

      setTransactions([...newTransactions.data]);
      setFilter('');
      setFilteredTransactions([...newTransactions.data]);
    };
    getTransactions();
    setIsModalOpen(false);
  };

  const handleSaveData = async (formData) => {
    const response = await api.saveTransaction(formData);
    console.log(response);

    const getTransactions = async () => {
      const newTransactions = await api.getTransactions(selectedPeriod);

      setTransactions([...newTransactions.data]);
      setFilter('');
      setFilteredTransactions([...newTransactions.data]);
    };
    getTransactions();
    setIsModalAddOpen(false);
  };

  const handleDelete = async (transactionToDelete) => {
    const isDeleted = await api.deleteTransaction(transactionToDelete);
    const getTransactions = async () => {
      const newTransactions = await api.getTransactions(selectedPeriod);

      setTransactions([...newTransactions.data]);
      setFilter('');
      setFilteredTransactions([...newTransactions.data]);
    };
    getTransactions();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsModalAddOpen(false);
    setSelectedTransaction({
      _id: '',
      description: '',
      value: '',
      category: '',
      type: '',
      yearMonthDay: '',
    });
  };
  // const handleButtonClick = () => {
  //   setIsModalOpen(true);
  // };

  return (
    <div className="container center">
      <h3>Controle Financeiro Pessoal</h3>
      <Select period={selectedPeriod} onChange={handlePeriodChange} />
      <Summary>{filteredTransactions}</Summary>
      <Controls
        filter={filter}
        onChangeFilter={handleChangeFilter}
        onPersist={handlePersist}
      />
      <Transactions onPersist={handlePersist} onDelete={handleDelete}>
        {filteredTransactions}
      </Transactions>
      {isModalOpen && (
        <ModalTransaction
          onSave={handleUpdateData}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
          title={modalTitle}
        />
      )}
      {isModalAddOpen && (
        <ModalAddTransaction onSave={handleSaveData} onClose={handleClose} />
      )}
    </div>
  );
}
