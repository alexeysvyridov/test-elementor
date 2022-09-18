import React, { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { createUser, findUserByEmail, getUserIp, updateUser } from '../../api'
import { UserAuth } from '../../contexts/AuthContext'
import './style.css'
import db from '../../firebase.config';

export const Login = () => {
  const { onSetUser } = useContext<AuthContext >(UserAuth);
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode:'onBlur',
    defaultValues: {
      username:'',
      email: '',
    }
  });
 
  const handleSubmitClick = async (data:{
    username: string,
    email: string
  }) => {
    const ip = await getUserIp();
    // const isExist = await findByEmail(data.email);
    const user = await findUserByEmail(data.email)

    const saveData:User = {
      userAgent: navigator.userAgent,
      entrance: new Date().toISOString(),
      username: data.username,
      email: data.email,
      userIP: ip,
      visitsCount: 1,
      // id: (new Date()).getTime().toString(),
    }

    if (!user) {
      await createUser(saveData)
    } else {
      await updateUser({...data, visitsCount: user?.visitsCount+1 })
    }

    // onSetUser(saveData);
    // navigate('/')
  }

  return (
    <div className="container container-by-center">
      <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit(handleSubmitClick)}>
        <h1>Sign in</h1>
        <div className="input-box">
          <Controller
            control={control}
            name="username"
            rules={{
              minLength: {
                value: 3,
                message: 'Value should be more the 3 chars'
              },
              required: {
                value: true,
                message: 'User name is required',
              }
            }}
            render={({ field }) => (
              <input placeholder="User name" type="text" {...field} />
            )}
          />
          {errors?.username && (
            <div className="error">{errors?.username?.message}</div>
          )}
        </div>
          <div className="input-box">
          <Controller
            control={control}
            name="email"
            rules= {{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email is Invalid',
              }
            }}
            render={({ field }) => (
              <input placeholder="Email" type="text" {...field} />
            )}
          />
          {errors?.email && (
            <div className="error">{errors?.email?.message}</div>
          )}
        </div>
          <div className="input-box">
            <button className="button-submit" type="submit">login</button>
          </div>
      </form>
      </div>
    </div>
  )
}
