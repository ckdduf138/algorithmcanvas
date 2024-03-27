import React from 'react';
import '../../styles/main.css';

export default function Main(props: {
    children: React.ReactNode
}) {
    return (
        <div className='main'>
            {props.children}
        </div>
    )
}