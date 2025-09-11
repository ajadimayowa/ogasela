import React from "react";
import { Button, Spinner } from "react-bootstrap";
const color = '#192252'; // You can change this to any color you want
interface CustomButtonProps {
    loading?: boolean;
    icon?:string;
    title: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "outline";
    className?: string;
    style?: React.CSSProperties;
    onClick?:()=>void
}
const CustomIconButton: React.FC<CustomButtonProps> = ({onClick,style,icon, className,variant,loading,title,type, ...props }) => {
    return (
        <Button 
        variant={variant}
        // style={{...style,backgroundColor: color ?? '#1A5745' }} 
        onClick={onClick} className={className} type={type} {...props} disabled={loading} 
        // style={{...props.style}}
         >
        <i className={icon}></i>
        {loading ? <Spinner animation="grow" size="sm" role="status" aria-hidden="true" /> :title}
        </Button>
    );
}
export default CustomIconButton;