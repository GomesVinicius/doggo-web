import React, { InputHTMLAttributes, useCallback } from 'react';
import { cpfMask, dateMask, registerMask, yearMask } from '../Mask';
import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    auxText?: string;
    mask?: "cpf" | "date" | "email" | "year" | "register";
}

const Input: React.FC<InputProps> = ({ label, name, auxText, mask,...rest}) => {
    const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        if (mask === 'cpf') {
            cpfMask(e);
        }
        if (mask === 'date') {
            dateMask(e);
        }
        if (mask === 'email') {

        }
        if (mask === 'year') {
            yearMask(e);
        }
        if (mask === 'register') {
            registerMask(e);
        }
        else {

        }
    }, [])

    return (
        <div className="input-block">
            <label
                htmlFor={name}
            >
                {label}
            </label>
            <input
                type="text"
                autoComplete="off"
                id={name}
                placeholder={auxText}
                onKeyUp={handleKeyUp}
                {...rest}
            />
        </div>
    )
};

export default Input;
