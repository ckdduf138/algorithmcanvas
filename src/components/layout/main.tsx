import React, { Component } from 'react';
import '../../styles/layout/main.css';

interface MainProps {
    children: React.ReactNode;
}

class Main extends Component<MainProps> {
    render() {
        const { children } = this.props;

        return (
            <div className='main'>
                {children}
            </div>
        );
    }
}

export default Main;
