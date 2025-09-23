import { useField } from "formik";
import React, { useState } from "react";

interface CustomInputProps {
    type?: string;
    placeholder?: string;
    id?: string;
    name?: string;
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

}
const CustomInput: React.FC<CustomInputProps> = ({ id, name, label, placeholder, type, icon, icon2 }) => {
    const [field, meta] = useField(name);
    const [secured, setSecured] = useState(true);
    return (
        <div className="form-group w-100">
            <label htmlFor={id} className="fw-medium m-1">{label}</label>
            <div className="d-flex align-items-center">

                {
                    icon &&
                    <div className="p-2 border bg-gray rounded-end-0 rounded">
                        <i className={icon}></i>
                    </div>

                }

                <input
                    {...field}
                    type={secured && type == 'password' ? 'password' : 'text'}
                    name={id}
                    className="form-control p-2 rounded-0 outline-0"
                    id={id}
                    placeholder={placeholder}
                />
                {
                    type == 'password' &&
                    <div className="p-2 border bg-gray rounded-start-0 rounded">
                        <i role="button" onClick={() => setSecured(!secured)} className={icon2}></i>
                    </div>

                }
            </div>
        </div>
    );
}

export default CustomInput;