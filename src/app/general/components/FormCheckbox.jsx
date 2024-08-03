import React from "react";

export default function FormCheckbox(props) {
  return (
    <div className={`col-md-${props.col} d-flex flex-row mb-3`}>
      {props.text ? (
        <div style={{ marginRight: 5, marginLeft: 5 }}>
          <label htmlFor={`id_${props.id}`}>{props.text}</label>
        </div>
      ) : null}
      <div className="form-check">
        <input
          className="form-check-input mb-0"
          type={"checkbox"}
          name={`${props.name}`}
          onClick={props.onClick}
          required
          checked={props.value}
          onFocus={props.onFocus}
        />
      </div>
    </div>
  );
}
