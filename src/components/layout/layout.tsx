import React from 'react'
import Header from './header'
import Main from './main'
import Footer from './footer'

export default function Layout(props: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Header />
            <Main>
                {props.children}
            </Main>
            <Footer />
        </div>
    )
}
