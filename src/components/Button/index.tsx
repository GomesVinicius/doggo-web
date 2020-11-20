import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    func: Function;
}

const Button: React.FC<ButtonProps> = ({ label, func, ...rest }) => {
    return (
        <button
            onClick={func()}
        >
            {label}
        </button>
    )
};

export default Button;
