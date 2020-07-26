import React from "react";
import Button from "./Button";

function Transaction(props) {
  const {
    transaction,
    deleteTransaction,
    handleModal,
    setCurrentTransaction,
  } = props;
  const { day, value, description, category, _id } = transaction;
  const bckgColor =
    category === "Receita" ? "rgb(185, 240, 224" : "rgb(232, 173, 178)";

  function handleEdit() {
    handleModal(true, "edit");
    setCurrentTransaction(transaction);
  }

  return (
    <div id="boxTransaction" style={{ backgroundColor: bckgColor }}>
      <label class="transactionTitle">{day.toString().padStart(2, "0")}</label>
      <div class="boxColumn">
        <label class="transactionTitle">{category}</label>
        <label class="transactionSubtitle">{description}</label>
      </div>
      <label class="transactionTitle">{`R$ ${value},00`}</label>
      <div id="boxButtons">
        <Button
          onClick={handleEdit}
          children={
            <i class="material-icons" style={{ color: "#555" }}>
              edit
            </i>
          }
        />
        <Button
          onClick={() => deleteTransaction(_id)}
          children={
            <i class="material-icons" style={{ color: "#555" }}>
              delete
            </i>
          }
        />
      </div>
    </div>
  );
}

export default Transaction;
