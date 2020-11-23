import React, { SelectHTMLAttributes } from 'react'
import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
}

const Select: React.FC<SelectProps> = ({ label, name, ...rest }) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest}>
                {/*options.map( option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })*/}
            </select>
        </div>
    );
}

export default Select;