import { useField, Field } from "formik";
import React, { useState } from "react";
import Select from 'react-select';

interface CustomInputProps {
    inputType: "number-input" | "password" | "text-input" | string;
    type?: string;
    placeholder?: string;
    id?: string;
    name: string;
    label?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    style?: React.CSSProperties;
    icon?: string;
    icon2?: string;
    link?: string;
    linkTitle?: string;
    options: any[];
    passSelectedValue?: (v: any) => void;
}

const ReusableDropDownSelect: React.FC<CustomInputProps> = ({
    inputType,
    id,
    name,
    label,
    link,
    linkTitle,
    placeholder,
    type,
    icon,
    icon2,
    options,
    passSelectedValue
}) => {
    const [field, meta, helpers] = useField(name);
    const [secured, setSecured] = useState(true);
    const { setValue } = helpers;

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            boxShadow: 'none',
            minWidth: '100%',
            maxWidth: '300px',
            borderColor: state.isFocused ? '#1A5745' : '#ccc',
            '&:hover': {
                borderColor: '#1A5745',
            },
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused
                ? '#1A5745'
                : 'white',
            color: state.isFocused ? 'white' : 'black',
            '&:active': {
                backgroundColor: '#1A5745',
            },
        }),
        dropdownIndicator: (provided: any, state: any) => ({
            ...provided,
            color: state.isFocused ? '#1A5745' : '#666',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
    };

    const handleSelectChange = (selectedOption: any) => {
        setValue(selectedOption);
        if (passSelectedValue) {
            passSelectedValue(selectedOption);
        }
    };

    const renderIcon = (iconClass?: string, onClick?: () => void) =>
        iconClass && (
            <div className="p-2 border bg-gray rounded-end-0 rounded">
                <i className={iconClass} role={onClick ? "button" : undefined} onClick={onClick}></i>
            </div>
        );

    const renderEndIcon = (iconClass?: string, onClick?: () => void) =>
        iconClass && (
            <div className="p-2 border bg-gray rounded-start-0 rounded">
                <i className={iconClass} role={onClick ? "button" : undefined} onClick={onClick}></i>
            </div>
        );

    const renderInputField = () => {
        switch (inputType) {
            case "text-input":
                return (
                    <Field
                        {...field}
                        type="text"
                        name={name}
                        className="form-control p-2"
                        id={id}
                        placeholder={placeholder}
                    />
                );

            default:
                return (
                    <Select
                        {...field}
                        name={name}
                        className="rounded-0 outline-0 w-100"
                        id={id}
                        value={field.value}
                        placeholder={placeholder}
                        options={options} isSearchable
                        onChange={handleSelectChange}
                        styles={customStyles}
                    />

                );
        }
    };

    return (
        <div className="form-group">
            <div className="d-flex justify-content-between align-items-center">
                {label && (
                    <label htmlFor={id} className="fw-medium m-1 text-dark d-flex">
                        {label}
                    </label>
                )}
                {link && (<small className="p-0 m-0"><a href={link}>{linkTitle}</a></small>)}
            </div>
            <div className="d-flex align-items-center">
                {renderIcon(icon)}
                {renderInputField()}
                {inputType === "password" && renderEndIcon(icon2, () => setSecured(!secured))}
            </div>
        </div>
    );
};

export default ReusableDropDownSelect;
