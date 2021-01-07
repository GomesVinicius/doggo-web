import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    func: Function;
    color?: string;
}

const Button: React.FC<ButtonProps> = ({ label, func, color, ...rest }) => {
    return (
        <button
            onClick={func()}
            style={{backgroundColor: color}}
        >
            {label}
        </button>
    )
};

export default Button;
