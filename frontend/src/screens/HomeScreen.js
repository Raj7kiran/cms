import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'




function HomeScreen() {

  let navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(()=> {
    if(!userInfo){
      navigate('/')
    }
  },[userInfo, navigate])

  return (
    <div className='home'>
      <h1>Home</h1>
    </div>
  );
}

export default HomeScreen;