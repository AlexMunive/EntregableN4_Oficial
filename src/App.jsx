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
  const [page, setPage] = useState(0)   // estado para la pagina
  

  const getAllUsers = () => {
    const url = "https://users-crud.academlo.tech/users/"
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

  // paginación

  const maxItem = 6;
  const totalItems = users?.length;
  const maxPage = Math.ceil(totalItems / maxItem);

   //creamos dos funciones para aumentar y disminuir las paginas, no los items
   const onNextPage = () => {
    setPage((page + 1) % maxPage);
  };
  const onPrevPage = () => {
    setPage((page - 1) % maxPage);
  };

  // console.log(page)

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
         users?.slice(page * maxItem, maxItem * (page + 1)).map(user => (
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
      <div>
      <button
        onClick={onPrevPage}
        disabled={
          // si page viene en 0 lo desactivamos
          !page
        }
      >
        Prev
      </button>
      <button
        onClick={onNextPage}
        disabled={
          // si page es igual al ultimo se desactiva el boton
          page === Math.ceil(totalItems / maxItem) - 1
        }
      >
        Next
      </button>
      <p>
        {page + 1} of {maxPage}
      </p>
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
