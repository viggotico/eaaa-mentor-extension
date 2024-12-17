import { FormHTMLAttributes, useRef } from "react";
import styles from "./Form.module.css";

export interface InputButtonsProps {
    action?: FormHTMLAttributes<HTMLFormElement>['action'];
    children: React.ReactNode;
}

export const Form = ({ children, action }: InputButtonsProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    return <form ref={formRef} action={action}>
        {children}
  </form>;
}