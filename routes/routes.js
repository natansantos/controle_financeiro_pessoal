const express = require('express');
const transactionRouter = express.Router();
const {
  getTransaction,
  newTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../services/transactionService');

/* transactionRouter.get('/',async(req,res)=>{
  try {
    
  } catch (error) {
    res.status(500).send(error.message);
  }
}) */

transactionRouter.get('/', async (req, res) => {
  try {
    const { period } = req.query;
    if (!period) {
      res.status(404).send({
        error: 'Please inform the period param on the string (period=YYYY-MM)',
      });
      return;
    }
    const result = await getTransaction(period);
    if (result.error) {
      res.status(404).send({ error: result.error });
      return;
    }
    if (result.length === 0) {
      res.status(404).send({ error: 'Transactions not found on given period' });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

transactionRouter.post('/', async (req, res) => {
  try {
    const data = req.body;
    const result = await newTransaction(data);
    if (result.error) {
      res.status(404).send({ error: result.error });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

transactionRouter.patch('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const data = req.body;
    if (!_id) {
      res.status(404).send({ error: 'Missing id' });
      return;
    }
    const result = await updateTransaction(_id, data);
    if (!result) {
      res.status(404).send({ error: `Transaction with id ${_id} not found` });
      return;
    }
    if (result.error) {
      res.status(404).send({ error: result.error });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

transactionRouter.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      res.status(404).send({ error: 'Missing id' });
      return;
    }
    const result = await deleteTransaction(_id);
    if (!result) {
      res.status(404).send({ error: `Transaction with id ${_id} not found` });
      return;
    }
    if (result.error) {
      res.status(404).send({ error: result.error });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = transactionRouter;
