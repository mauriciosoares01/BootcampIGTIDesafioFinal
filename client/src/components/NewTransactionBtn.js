import React from "react";

export default function NewTransactionBtn({handleModal}) {
  return (
    <button id="newTransaction" class="waves-effect waves-light btn" onClick={() => handleModal(true, 'new')}>
      <i class="material-icons left">add</i>Novo lançamento
    </button>
  );
}
