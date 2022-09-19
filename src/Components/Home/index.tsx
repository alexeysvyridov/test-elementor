import React, { useContext } from "react"
import { updateUser } from "../../api";
import { UserAuth } from "../../contexts/AuthContext"
import { Loader } from "../shared/Loader";
import { UserList } from "./UserList";
import SignOut from '../../assets/images/sign-out.png'
import './style.css';
import { Link } from "react-router-dom";
import { resetStorage, setStorage } from "../../helpers";
import { useGetUsersQuery } from "../../hooks/useGetUsersQuery";


export const Home = ():JSX.Element => {
  const {user, onSetUser} = useContext(UserAuth);
  const { users, isLoading, isError, error } = useGetUsersQuery(() => {
    const lastUpdate = new Date().getTime();
      updateUser({
        id: user?.id,
        lastUpdate,
      });
      setStorage('user', {...user, lastUpdate})
  });
 
  const renderUsers = () => {
    if (isLoading) { 
      return <Loader />
    }

    return <UserList users={users} />
  }

  const handleSignOut = () => {
    onSetUser(null);  
    resetStorage();
  }

  return (
    <div className="main">
      <div className="header">
        <h1>Hello {user?.username}</h1>
        {isError && (
          <div>{error?.message}</div>
        )}
        <Link onClick={handleSignOut} className="icon-signin" to="/login">
          <img src={SignOut} alt="sign-out" />
        </Link>
      </div>
      {renderUsers()}
    </div>
  )
}
