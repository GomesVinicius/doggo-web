import React, { InputHTMLAttributes, useCallback } from 'react';
import { cpfMask } from '../Mask';
import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    auxText?: string;
    mask?: "cpf" | "data" | "email";
}

const Input: React.FC<InputProps> = ({ label, name, auxText, mask,...rest}) => {
    const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        if (mask === 'cpf') {
            cpfMask(e);
        }
        if (mask === 'data') {

        }
        if (mask === 'email') {

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
