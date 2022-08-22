import React, { useState } from 'react'
import axios from 'axios'

const CardUser = ({user,getAllUsers,setUpdateInfo,handleOpenForm, open,setUsersDelete}) => {

  const deleteUser = () => {

    setUsersDelete(user)
    open()
  
  }

  

  const handleUpdateClick=()=>{
    handleOpenForm()
    // open()
    setUpdateInfo(user)
  }
  const handleUpdateClickA=()=>{  
    open()
  }
  
  return (
    <article className='card'>
      <div>
        <h2>{user["first_name"]} {user["last_name"]}</h2>
        <hr />
        <div>
          <p>E-mail</p>
          <h3>{user.email}</h3>
          <p>Birthday</p>
          <h3 className='card_birthday'><i className='bx bx-gift'></i> {user.birthday}</h3>
        </div>
        <hr />
        <div>
          <footer className='card_footer'>
          <button onClick={deleteUser} className='btn_A'><i className='bx bx-trash'></i></button>
          <button onClick={handleUpdateClick} className='btn_B'><i className='bx bx-pencil'></i></button>
          </footer>
        </div>
      </div>
    </article>
  )
}

export default CardUser