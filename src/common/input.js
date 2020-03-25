import * as React from 'react'

export default function Input (props) {
  return (
    <div className="input">
      {props.label && <div className="input__label">{props.label}</div>}
      <input
        type={props.type}
        name={props.name}
        className={'form-control input__field'}
        id={props.id}
        value={props.value}
        required={props.required}
        aria-required={props.required}
        placeholder={props.placeholder || ''}
        onBlur={(evt) => props.onBlur && props.onBlur(evt)}
        onChange={(evt) => props.onChange(evt)}
        disabled={props.disabled || false}
        maxLength={props.maxLength}
        minLength={props.minLength}
      />
    </div>
  )
}
