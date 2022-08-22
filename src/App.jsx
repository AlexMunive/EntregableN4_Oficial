import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import CardUser from './components/CardUser'
import UserForm from './components/UserForm'
import Confirmation from './components/Confirmation'
import Time from './components/Time'

function App() {

  const [users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isFromConfirmation, setIsFromConfirmation] = useState(false)
  const [usersDelete, setUsersDelete] = useState()
  

  const getAllUsers = () => {
    const url = "https://users-crud1.herokuapp.com/users/"
    axios.get(url)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()

  }, [])

  // Modal form principal

  const handleOpenForm = () => setIsFormOpen(true)

  const handleCloseForm = () => setIsFormOpen(false)

  // Modal confirmation

  const open = () => setIsFromConfirmation(true)

  const off = () => setIsFromConfirmation(false)


  console.log(users)

  return (
    <div className="App">
      <div>
        <div className='App_users_btn'>
          <h1 className='App_users'>Users</h1>            
          <Time/>                        
          <button onClick={handleOpenForm} className='lbl-modal' >+ Create new user</button>
        </div>
        <div className={isFormOpen ? 'form-container' : 'form-none'}>
          <UserForm
            getAllUsers={getAllUsers}
            updateInfo={updateInfo}
            setUpdateInfo={setUpdateInfo}
            handleCloseForm={handleCloseForm}
          />
        </div>
      </div>
      <div className='App_user_A'>
        {          
         users?.map(user => (
            <CardUser
              key={user.id}
              user={user}
              getAllUsers={getAllUsers}
              setUpdateInfo={setUpdateInfo}
              handleOpenForm={handleOpenForm}
              open={open}
              setUsersDelete={setUsersDelete}
            />
          ))
        }
      </div>
      <div className={isFromConfirmation ? 'form-container-A' : 'form-none-A'}>

        <Confirmation
          off={off}
          usersDelete={usersDelete}
          getAllUsers={getAllUsers}
        />
      </div>

    </div>
  )
}

export default App
