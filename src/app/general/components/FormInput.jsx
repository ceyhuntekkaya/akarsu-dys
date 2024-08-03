import React from "react";

export default function FormInput(props) {
  return (
    <div className={`col-md-${props.col} mb-3`}>
      <div>
        <label htmlFor={`id_${props.id}`}>{props.text}</label>
        {props.required ? (
          <input
            ref={props.ref}
            className={`form-control ${props.className}`}
            name={`${props.name}`}
            type={props.type}
            checked={props.value}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onSelect={props.onSelect}
            onClick={props.onClick}
            onFocus={props.onFocus}
            required
            min={props.min}
            max={props.max}
          />
        ) : (
          <input
            ref={props.ref}
            className={`form-control ${props.className}`}
            name={`${props.name}`}
            type={props.type}
            checked={props.value}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onSelect={props.onSelect}
            onClick={props.onClick}
            onFocus={props.onFocus}
            min={props.min}
            max={props.max}
          />
        )}

        {props.desc ? (
          <small className="form-text text-muted">{props.desc}</small>
        ) : null}
      </div>
    </div>
  );
}
