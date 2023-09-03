import React from 'react'

const Navbar = () => {
  return (
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%"}}>
        <div id='logo'>
            <h2>LOGO</h2>
            </div> 
        <div id='nav-items'  style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"70%"}}>
            <h3>Add product</h3>
            <h3>Your Product</h3>
            <h3>Profile</h3>
            <h3>Cart</h3>
            <h3>Register/Login</h3>
        </div> 
    </div>
  )
}

export default Navbar