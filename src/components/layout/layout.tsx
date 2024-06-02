import React from 'react';
import Header from './header';
import Main from './main';
import Footer from './footer';

interface LayoutProps {
    subTitle: string;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ subTitle, children }) => {
    return (
        <>
            <Header subTitle={subTitle} />
            <Main>
                {children}
            </Main>
            <Footer />
        </>
    );
};

export default Layout;
