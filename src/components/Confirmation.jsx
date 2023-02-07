import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Confirmation = ({ off,usersDelete,getAllUsers}) => {

    // console.log(usersDelete)
    

    const deleteUser = (e) => {
        e.preventDefault()
        const URL = `http://users-crud.academlo.tech/users/${usersDelete.id}/`
        axios.delete(URL)
          .then(res => {
            console.log(res.data)
            getAllUsers()
            off()
          })
          .catch(err => console.log(err))
      }
   

    return (
        <form className='form_confirmation'>
            <div>
            <i onClick={off} className='bx bxs-x-circle circleB' ></i>
            <h4 className='confirmation_h4'>Delete user</h4>
            </div>
            <h6>user<span className='form_confirmation_user'> {usersDelete?.["first_name"]} {usersDelete?.["last_name"]}</span> has been deleted</h6>
            <button onClick={deleteUser} className='confirmation_btn'>To accept</button>
        </form>
    )
}

export default Confirmation