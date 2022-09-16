import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import './style.css'
export const Home = () => {
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode:'all',
    defaultValues: {
      username:'',
      email: '',
    }
  })

  const handleSubmitClick = (data:any) => {
    console.log(data)
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
