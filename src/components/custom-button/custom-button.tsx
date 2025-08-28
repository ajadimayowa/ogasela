import React from "react";
import { Button, Spinner } from "react-bootstrap";
const color = '#192252'; // You can change this to any color you want
interface CustomButtonProps {
    loading?: boolean;
    title: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "outline";
    className?: string;
    style?: React.CSSProperties;
    onClick?:()=>void
}
const CustomButton: React.FC<CustomButtonProps> = ({onClick,style, className,variant,loading,title,type, ...props }) => {
    return (
        <Button 
        variant={variant}
        // style={{...style,backgroundColor: color ?? '#1A5745' }} 
        onClick={onClick} className={className} type={type} {...props} disabled={loading} 
        // style={{...props.style}}
         >
        {loading ? <Spinner animation="grow" size="sm" role="status" aria-hidden="true" /> :title}
        </Button>
    );
}
export default CustomButton;