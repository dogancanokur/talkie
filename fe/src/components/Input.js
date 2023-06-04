import React from "react";

const Input = (props) => {
    const {label, error, id, name, type, isRequired, onChange, info, container} = props;

    let errorClassName = (error ? 'is-invalid ' : '') + 'form-control';
    return (<div className={container}>
        <label htmlFor={id} className="form-label">{label}</label>
        <div className="input-group has-validation">
            {id === 'username' && <span className="input-group-text" id={'usernameInputGroupPrepend'}>@</span>}
            <input className={errorClassName}
                   id={id} name={name} required={isRequired}
                   onChange={onChange} type={type ? type : 'text'}/>
            <div className="invalid-feedback">{error}</div>
        </div>
        {info && <div id="help" className="form-text">{info}</div>}
    </div>);
}

export default Input;