import axios from "axios";

const API_URL = "http://mauricio-bootcamp-igti-final.herokuapp.com/api";

async function getTransactions(period) {
  try {
    const res = await axios.get(`${API_URL}/transaction/${period}`);
    return res.data;
  } catch (error) {
    return error;
  }
}

async function deleteTransaction(id) {
  try {
    const res = await axios.delete(`${API_URL}/transaction/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
}

async function updateTransaction(id, body) {
  try {
    const res = await axios.put(`${API_URL}/transaction/${id}`, body);
    return res.data;
  } catch (error) {
    return error;
  }
}

async function createTransaction(body) {
  try {
    const res = await axios.post(`${API_URL}/transaction/`, body);
    return res.data;
  } catch (error) {
    return error;
  }
}

export {
  getTransactions,
  deleteTransaction,
  updateTransaction,
  createTransaction,
};
