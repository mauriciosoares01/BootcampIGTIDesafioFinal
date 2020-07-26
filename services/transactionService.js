const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require("../models/TransactionModel");

const getTransactions = async (req, res) => {
  try {
    const { period } = req.params;
    if (!period) {
      res.send({
        ok: false,
        message:
          'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
      });
    }
    const data = await TransactionModel.find({ yearMonth: period });
    res.send({ ok: true, data });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Erro ao retornar as transações para o período",
    });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { body } = req;
    await TransactionModel.create(body);
    res.send({ ok: true, message: "Transação criada com sucesso" });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Erro ao criar a transação",
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    if (!body || !id) {
      res.status(400).send("Faltando parâmetros");
    }
    const data = await TransactionModel.findByIdAndUpdate({ _id: id }, body, { new: true });
    res.send({ ok: true, data });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Erro ao atualizar a transação",
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).send("Faltando parâmetros");
    }
    await TransactionModel.findByIdAndDelete({ _id: id });
    res.send({ ok: true, message: "Transação excluida com sucesso" });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Erro ao apagar a transação",
    });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
