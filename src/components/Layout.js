import React from "react";
import ThreeBg from "./Background";

const Layout = ({ children }) => {
    return (
        <div style={{ height: '100%' }}>
            <ThreeBg />
            {children}
        </div>
    )
}

export default Layout;