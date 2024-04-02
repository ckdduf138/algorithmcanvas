import React, { Component } from 'react';
import './page_notFound.css';

class Page_NotFound extends Component {
    render() {
        return (
            <div className='page_notFound'>
                <h1>404 - Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        );
    }
}

export default Page_NotFound;
