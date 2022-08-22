import React, { useEffect, useState } from 'react'

const Time = () => {

  const [clockState, setClockState] = useState()
  const [dateTime, setDateTime] = useState()
  

  useEffect(() => {

    setInterval(() => {

      const date = new Date()
      setClockState(date.toLocaleTimeString())  // toTimeString()
      

    }, 1000);

  }, [])
  useEffect(() => {

    setInterval(() => {

      const date = new Date()
      setDateTime(date.toLocaleDateString())  

    }, 1000);

  }, [])
  return (
    <div>
      <div className='reloj'>
        <h1 className='hora'>{clockState}</h1>
        <hr />
        <h2 className='fecha'>{dateTime}</h2>
      </div>
    </div>
  )
}

export default Time