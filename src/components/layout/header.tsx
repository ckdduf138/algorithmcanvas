import React, { Component } from 'react';
import '../../styles/layout/header.css';

class Header extends Component {

    header_onClicked = () => {
        window.location.href = "./";
    };

    render() {
        return (
            <header className='header'>
                <div className='head_title' onClick={this.header_onClicked}>Algo-Canvas</div>
            </header>
        );
    }
}

export default Header;
