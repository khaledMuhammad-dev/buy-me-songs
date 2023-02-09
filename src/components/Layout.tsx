import React from "react";
import styles from "@styles/Layout.module.scss";

interface Props {
    children: React.ReactNode
}

export const Layout:React.FC<Props> = ({ children }) => {
    const { layout } = styles;

    return (
        <div className={layout}>
            {children}
        </div>
    )
}