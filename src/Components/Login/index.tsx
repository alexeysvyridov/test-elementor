import React, { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getUserIp } from '../../api'
import { UserAuth } from '../../contexts/AuthContext'
import './style.css'


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
    const saveData = {
      userAgent: navigator.userAgent,
      entranceDate: new Date().toISOString(),
      username: data.username,
      email: data.email,
      userIp: ip
    }
    onSetUser(saveData);
    navigate('/')
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
