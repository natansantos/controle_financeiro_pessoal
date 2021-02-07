import axios from 'axios';

const YEAR_NUMBERS = [2019, 2020, 2021];

const MONTH_DESCRIPTIONS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const PERIODS_ARRAY = YEAR_NUMBERS.map((year, yIndex) => {
  return MONTH_DESCRIPTIONS.map((month, mIndex) => {
    return {
      id: `ym-${yIndex}-${mIndex}`,
      description: `${month}/${year}`,
      value: `${year}-${mIndex + 1 < 10 ? '0' : ''}${mIndex + 1}`,
    };
  });
});

export const PERIODS = [
  ...PERIODS_ARRAY[0],
  ...PERIODS_ARRAY[1],
  ...PERIODS_ARRAY[2],
];

const BASE_URL = 'http://localhost:3001/api/transaction';

export async function getTransactions(period) {
  const transactions = await axios.get(`${BASE_URL}?period=${period}`);
  return transactions;
}

export async function updateTransaction(transaction) {
  const { _id, description, value, category, type, yearMonthDay } = transaction;
  const response = await axios.patch(`${BASE_URL}/${_id}`, {
    description,
    value,
    category,
    type,
    yearMonthDay,
  });
  return response.data;
}
export async function saveTransaction(transaction) {
  const {
    description,
    value,
    category,
    type,
    yearMonthDay,
    year,
    month,
    day,
    yearMonth,
  } = transaction;
  const response = await axios.post(`${BASE_URL}`, {
    description,
    value,
    category,
    type,
    yearMonthDay,
    year,
    month,
    day,
    yearMonth,
  });
  return response.data;
}

export async function deleteTransaction(transaction) {
  const response = await axios.delete(`${BASE_URL}/${transaction._id}`);
  return response.data;
}
