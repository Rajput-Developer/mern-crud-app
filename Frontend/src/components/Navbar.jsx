import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext.jsx';

export default function Navbar() {
  const [darkMode, setDarkMode] = useContext(ThemeContext);
  return (
    <>
      <nav className='navbar navbar-expand-lg bg-dark' style={{ backgroundColor: darkMode ? '#212529' : '#fff' }}>
        <div className="container-fluid">
          <Link className='navbar-brand text-black text-white' to='/'>Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <div className="d-flex" role="search">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item p-2 mx-3">
                  <Link className='nav-link text-white' aria-current="page" to="/createPage"><i className="fa-solid fa-plus"></i></Link>
                </li>
                <li className="nav-item p-2 mx-3">
                  <Link className='nav-link text-white'>{darkMode ? <i onClick={() => setDarkMode(false)} className="fa-solid fa-sun"></i> : <i className="fa-regular fa-sun" onClick={() => setDarkMode(true)}></i>}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
