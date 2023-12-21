import React from 'react'


export default function Navbar() {
  let myStyle = {
   // background: "linear-gradient(white, black, white)",
   // color: "transparent",
   // backgroundClip: "text",
    fontFamily: "'Permanent Marker', cursive",
    textAlign: "center",
    fontSize: "50px",
    //marginLeft: "565px"
  }

  return (
    <>
      <div className='my-5'>
       <h1 className="heading" style={myStyle}>Tic Tac Toe</h1>
      </div>
    </>
    
  )
}
