import React, { InputHTMLAttributes } from 'react';
import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    auxText?: string;
}

const Input: React.FC<InputProps> = ({ label, name, auxText, ...rest}) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" autoComplete="off" id={name} placeholder={auxText} {...rest}/>
        </div>
    )
};

export default Input;
