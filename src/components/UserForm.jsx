import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const defaultValue = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthday: "",
}

const UserForm = ({ getAllUsers, updateInfo, setUpdateInfo, handleCloseForm }) => {
    
    useEffect(() => {
        if (updateInfo) {
            reset(updateInfo)
        }

    }, [updateInfo])


    const createUser = (data) => {
        const url = "https://users-crud.academlo.tech/users/"
        axios.post(url, data)
            .then(res => {
                console.log(res.data)
                getAllUsers()
            })
            .catch(err => console.log(err))
    }

    const updateUser = data => {
        const URL = `https://users-crud.academlo.tech/users/${updateInfo.id}/`
        axios.patch(URL, data)
            .then(res => {
                console.log(res.data)
                getAllUsers()
            })
            .catch(err => console.log(err))
    }

    const { register, reset, handleSubmit } = useForm()

    const submit = data => {
        if (updateInfo) {
            // Update Movie
            updateUser(data)
            setUpdateInfo()
        } else {
            // Create New Movie
            createUser(data)
        }
        reset(defaultValue)
        handleCloseForm()

    }


    return (
        <form onSubmit={handleSubmit(submit)} className="form">
            <div className='form_h4_circle'>
                <h4>{
                    updateInfo ?
                        'Update User Information'
                        :
                        'Create New User'
                    }
                </h4>
               <i  onClick={handleCloseForm} className='bx bxs-x-circle' ></i>
            </div>
            <div className='form_position'>
                <label className='form_label' htmlFor="first_name">First name</label>
                <input className='form_position_input' {...register("first_name")} type="text" id='first_name' placeholder='First_name' />
            </div>
            <div className='form_position'>
                <label className='form_label' htmlFor="last_name">Last name</label>
                <input className='form_position_input' {...register("last_name")} type="text" id='last_name' placeholder='Last_name' />
            </div>
            <div className='form_position'>
                <label className='form_label' htmlFor="email">Email</label>
                <input className='form_position_input' {...register("email")} type="email" id='email' placeholder='Email' />
            </div>
            <div className='form_position'>
                <label className='form_label' htmlFor="password">Password</label>
                <div className='form_position_password'>
                    <input className='form_position_input_password' {...register("password")} type="password" id='password' placeholder='Password' />
                    <button className='btn_password'><i className='bx bxs-low-vision'></i></button>
                </div>
            </div>
            <div className='form_position'>
                <label className='form_label' htmlFor="birthday">Birthday</label>
                <input className='form_position_input' {...register("birthday")} type="date" id='birthday' placeholder='Birthday' />
            </div>
            <button className='form_btn'>{ updateInfo ? 'Update User' : 'Create New User' }</button>
        </form>
    )
}

export default UserForm