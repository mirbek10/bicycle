import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './header.scss'
import { useDispatch } from 'react-redux';



function Header() {
    const dispatch = useDispatch();

    return (
        <header className='header'>
            header
        </header>
    )
}

export default Header
