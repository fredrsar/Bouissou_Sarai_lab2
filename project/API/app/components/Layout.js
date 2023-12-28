import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'


export default function Layout({children}) {
    return (
      
      <div>
        <title>PuechBouis API</title>
        <Header/>
        <Nav/>
        <div className="min-h-screen container mx-auto">
          {children}
        </div>
        <Footer/>
      </div>
    );
  }
