import {Outlet} from "react-router-dom";
import Header from "./header/Header"

import react from 'react';

const Layout = () => {
    return (
        <>
        <Header/>
        <main>
            <Outlet/>
        </main>
        </>
    )
}

export default Layout