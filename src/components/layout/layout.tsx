import React, { Component } from 'react';
import Header from './header';
import Main from './main';
import Footer from './footer';

interface LayoutProps {
    children: React.ReactNode;
}

class Layout extends Component<LayoutProps> {
    render() {
        const { children } = this.props;

        return (
            <div>
                <Header />
                <Main>
                    {children}
                </Main>
                <Footer />
            </div>
        );
    }
}

export default Layout;
