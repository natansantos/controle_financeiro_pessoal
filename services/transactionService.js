const mongoose = require('mongoose');
const { findByIdAndDelete } = require('../models/TransactionModel');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const getTransaction = async (yearMonth) => {
  try {
    const transaction = await TransactionModel.find({ yearMonth });
    return transaction;
  } catch (error) {
    return { error: error.message };
  }
};

const newTransaction = async (data) => {
  try {
    const transaction = await TransactionModel.create(data);
    return transaction;
  } catch (error) {
    return { error: error.message };
  }
};

const updateTransaction = async (_id, data) => {
  try {
    const transaction = await TransactionModel.findByIdAndUpdate(
      { _id },
      data,
      { new: true }
    );
    return transaction;
  } catch (error) {
    return { error: error.message };
  }
};

const deleteTransaction = async (_id) => {
  try {
    const transaction = await TransactionModel.findByIdAndDelete(_id);
    return transaction;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  getTransaction,
  newTransaction,
  updateTransaction,
  deleteTransaction,
};
