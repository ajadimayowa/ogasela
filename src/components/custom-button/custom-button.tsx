import React from "react";
import { Button, Spinner } from "react-bootstrap";

interface CustomButtonProps {
    loading?: boolean;
    title: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
    className?: string;
}
const CustomButton: React.FC<CustomButtonProps> = ({ className,loading,title,type, ...props }) => {
    return (
        <Button className={className} type={type} {...props} disabled={loading} 
        // style={{...props.style}}
         >
        {loading ? <Spinner animation="grow" size="sm" role="status" aria-hidden="true" /> :title}
        </Button>
    );
}
export default CustomButton;