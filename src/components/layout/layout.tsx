import React from 'react';
import Header from './header';
import Main from './main';
import Footer from './footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <Main>
                {children}
            </Main>
            <Footer />
        </>
    );
};

export default Layout;
