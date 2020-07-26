import React, { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";

export default function DefaultModal({
  open,
  handleModal,
  action,
  transaction,
}) {
  const [id, setId] = useState();
  const [yearMonthDay, setYearMonthDay] = useState();
  const [type, setType] = useState('-');
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    if (action === "edit") {
      setId(transaction._id);
      setYearMonthDay(transaction.yearMonthDay);
      setType(transaction.type);
      setDescription(transaction.description);
      setCategory(transaction.category);
      setValue(transaction.value);
    }
  }, [transaction]);

  function handleRadio(event) {
    setType(event.target.id);
  }

  function handleDescription(event) {
    setDescription(event.target.value);
  }

  function handleCategory(event) {
    setCategory(event.target.value);
  }

  function handleValue(event) {
    setValue(event.target.value);
  }

  function handleDateChange(event) {
    setYearMonthDay(event.target.value);
  }

  async function handleSubmit() {
    if (
      (!id && action === 'edit') ||
      !description ||
      !category ||
      !value ||
      !yearMonthDay ||
      !type
    ) return;

    let body = {
      description,
      category,
      value,
      year: yearMonthDay.slice(0, 4),
      month: yearMonthDay.slice(5, 7),
      day: yearMonthDay.slice(8, 10),
      yearMonth: yearMonthDay.slice(0, 7),
      yearMonthDay,
      type,
    };
    handleModal(false, action, id, body);
  }

  return (
    <Modal
      open={open}
      onBackdropClick={() => handleModal(false)}
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div id="modalContent">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5>
            {action === "edit" ? "Edição de lançamento" : "Novo lançamento"}
          </h5>
          <a
            class="waves-effect waves-light btn-small red"
            onClick={() => handleModal(false, null)}
          >
            <i class="material-icons">close</i>
          </a>
        </div>
        <div>
          <p>
            <label>
              <input
                name="group1"
                type="radio"
                id="-"
                checked={type === '-'}
                disabled={action === "edit"}
                onClick={handleRadio}
              />
              <span>Despesa</span>
            </label>
          </p>
          <p>
            <label>
              <input
                name="group1"
                type="radio"
                id="+"
                checked={type === '+'}
                disabled={action === "edit"}
                onClick={handleRadio}
              />
              <span>Receita</span>
            </label>
          </p>
        </div>
        <div>
          <label for="descricao">Descrição</label>
          <input id="descricao" onChange={handleDescription} value={description}/>
          <label for="categoria">Categoria</label>
          <input id="categoria" onChange={handleCategory} value={category}/>
          <label for="valor">Valor</label>
          <input id="valor" type="number" onChange={handleValue} value={value}/>
          <label for="date">Data</label>
          <input id="date" type="date" onChange={handleDateChange} value={yearMonthDay}/>
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: 25 }}>
          <button
            id="newTransaction"
            class="waves-effect waves-light btn"
            onClick={handleSubmit}
          >
            Salvar
          </button>
        </div>
      </div>
    </Modal>
  );
}
