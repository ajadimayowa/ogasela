import { useField, Field, useFormikContext } from "formik";
import React, { useState } from "react";
import Select from 'react-select';

interface CustomInputProps {
    
    name: string;
    label?: string;
    className?: string;
    placeHolder?:string;
    options: any[];
    passSelectedValue?: (v: any) => void;
}

const MultiPartFormReusableDropDownSelect: React.FC<CustomInputProps> = ({
    name,
    label,
    options,
    placeHolder,
    passSelectedValue
}) => {
    const { setFieldValue } = useFormikContext<any>();
    const [field, meta, helpers] = useField(name);

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

   

    return (
        <div className="">
            {label && <label className="m-1" htmlFor={name}>{label}</label>}
            <Select
                id={name}
                name={name}
                placeholder={placeHolder}
                options={options}
                value={field.value}
                onChange={(option) => setFieldValue(name, option)}
                onBlur={() => field.onBlur({ target: { name } })}
                styles={customStyles}
            />
            {meta.touched && meta.error && (
                <div className="text-danger">{(meta.error as any)?.label || meta.error}</div>
            )}
        </div>
    );
};

export default MultiPartFormReusableDropDownSelect;
