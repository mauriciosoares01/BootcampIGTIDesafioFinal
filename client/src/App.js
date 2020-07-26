import React, { useEffect, useState } from "react";
import {
  PeriodPicker,
  Summary,
  Header,
  NewTransactionBtn,
  Filter,
  TransactionsList,
  DefaultModal,
} from "./components";
import { getTransactions } from "../src/services/transaction";
import M from "materialize-css";
import { deleteTransaction, updateTransaction, createTransaction } from "./services/transaction";

export default function App() {
  const [transactions, setTransactions] = useState();
  const [savedTransactions, setSavedTransactions] = useState();
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [entry, setEntry] = useState();
  const [income, setIncome] = useState();
  const [expense, setExpense] = useState();
  const [balance, setBalance] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState();
  const [currentTransaction, setCurrentTransaction] = useState();

  async function handleModal(active, action, id, body) {
    setModalAction(action);

    if (body) {
      let result;
      if (action === "edit") {
        result = await updateTransaction(id, body);
      } else {
        result = await createTransaction(body);
      }
      if(result.ok) {
        getData();
      }
    }

    setShowModal(active);
  }

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    getData();
  }, [period]);

  useEffect(() => {
    handleSumary();
  }, [transactions]);

  useEffect(() => {
    handleFilter();
  }, [searchTerm]);

  function handleFilter() {
    if (!searchTerm) {
      return;
    }
    const termLowerCase = searchTerm.toLowerCase();
    const result = savedTransactions.filter((item) => {
      const description = item.description.toLowerCase();
      return description.indexOf(termLowerCase) !== -1;
    });
    setTransactions(result);
  }

  function handleSumary() {
    if (!transactions) return;
    let incomeAcc = 0;
    let expenseAcc = 0;
    transactions.forEach((element) => {
      if (element.category === "Receita") {
        incomeAcc += element.value;
      } else {
        expenseAcc += element.value;
      }
    });
    setEntry(transactions.length);
    setIncome(incomeAcc);
    setExpense(expenseAcc);
    setBalance(incomeAcc - expenseAcc);
  }

  async function getData() {
    setLoading(true);
    let current = period;
    if (!current) {
      const date = new Date();
      current = `${date.getFullYear()}-${date
        .getMonth()
        .toString()
        .padStart(2, "0")}`;
      setPeriod(current);
    }
    const result = await getTransactions(current);
    if (result.ok) {
      setTransactions(result.data);
      setSavedTransactions(result.data);
    }
    setLoading(false);
  }

  async function deleteItem(id) {
    const result = await deleteTransaction(id);
    if (result.ok) {
      getData();
    }
  }

  return (
    <div class="container" id="container">
      <Header />
      <PeriodPicker currentPeriod={period} setCurrentPeriod={setPeriod} />
      <DefaultModal
        open={showModal}
        handleModal={handleModal}
        action={modalAction}
        transaction={currentTransaction}
      />
      <Summary
        entry={entry}
        income={income}
        expense={expense}
        balance={balance}
      />
      <div class="content" id="boxFilter">
        <NewTransactionBtn handleModal={handleModal} />
        <Filter term={searchTerm} onChange={setSearchTerm} />
      </div>
      <TransactionsList
        data={transactions}
        loading={loading}
        deleteTransaction={deleteItem}
        handleModal={handleModal}
        setCurrentTransaction={setCurrentTransaction}
      />
    </div>
  );
}
