import React from "react";

export default function Filter({term, onChange}) {

  function handleChange(event) {
    onChange(event.target.value);
  }

  return (
    <input value={term} placeholder="Filtro" onChange={handleChange} type="search" />
  )
}
