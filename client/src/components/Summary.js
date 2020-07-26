import React, { useState } from "react";

export default function Summary(props) {
	const {entry, income, expense, balance} = props;
	
	return (
    <div id="sumary">
      <div>
        <label class="summaryTitle">Lançamentos: </label>
        <label >{entry}</label>
      </div>
      <div>
        <label class="summaryTitle">Receitas: </label>
        <label style={{color: entry > 0 ? '#00B333' : '#ff3333'}} >R$ {income}</label>
      </div>
      <div>
        <label class="summaryTitle">Despesas: </label>
        <label style={{color: expense > 0 ? '#00B333' : '#ff3333'}} >R$ {expense}</label>
      </div>
      <div>
        <label class="summaryTitle">Saldo: </label>
        <label style={{color: balance > 0 ? '#00B333' : '#ff3333'}} >R$ {balance}</label>
      </div>
    </div>
  );
}
