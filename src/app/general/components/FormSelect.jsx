import React from "react";

export default function FormSelect(props) {
  return (
    <div className={`col-md-${props.col} mb-3`}>
      {props.text ? (
        <label htmlFor={`id_${props.id}`}>{props.text}</label>
      ) : null}
      <select
        className="form-select w-100 mb-0"
        name={`${props.name}`}
        aria-label="Select one"
        onChange={props.onChange}
        required
        onFocus={props.onFocus}
      >
        {props.data
          ? props.data.map((v, key) =>
              v[props.valuekey] === props.value ? (
                <option selected key={key} value={v[props.valuekey]}>
                  {v[props.textkey]}
                </option>
              ) : (
                <option key={key} value={v[props.valuekey]}>
                  {v[props.textkey]}
                </option>
              )
            )
          : null}
      </select>
    </div>
  );
}
