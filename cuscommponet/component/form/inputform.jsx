import React from 'react'
import PropTypes from 'prop-types';
import {Input, FormGroup, Label } from 'reactstrap'

function InputForm({type, name,label, value, placeholder,onChangeHandler, error}) {
    return (
        <FormGroup>
                <Label for={name}>{label}</Label>
                <Input 
                    type={type} 
                    name={name} 
                    id={name} 
                    value={value} 
                    placeholder={placeholder} 
                    onChange={onChangeHandler}
                    className={error ? "form-control is-invalid" : "form-control"}
                />
                { error && <div className="invalid-feedback">{error}</div> }
        </FormGroup>
    )
}
InputForm.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeHandler: PropTypes.func.isRequired,
    
}
export default InputForm