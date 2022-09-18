import React, { useContext, useEffect, useRef, useState } from "react"
import { getUsers, updateUser } from "../../api";
import { UserAuth } from "../../contexts/AuthContext"
import { Loader } from "../shared/Loader";
import { UserList } from "./UserList";
import SignOut from '../../assets/images/sign-out.png'
import './style.css';
import { Link } from "react-router-dom";
import { resetStorage, setStorage } from "../../helpers";
const MS = 5000; 

export const Home = ():JSX.Element => {
  const {user, onSetUser} = useContext(UserAuth);
  const [users, setUsers] = useState<any>([]);
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const callOnce = useRef(true);
  useEffect(() => {
    const fetchUsers = async () => {
      if (callOnce.current) {
        callOnce.current = false;
        setIsLoading(true);
      }
      try {
        const usersList = await getUsers();
        setUsers(usersList);
      } catch (error) {
        console.error(error);
        setError({
          message: 'Error happened!!',
          isError: true
        })
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
    const timeout = setInterval(() => {
      const lastUpdate = new Date().getTime();
      fetchUsers();
      updateUser({
        id: user?.id,
        lastUpdate,
      });
      setStorage('user', {...user, lastUpdate})
    }, MS);

    return () => clearInterval(timeout)
  }, [])

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
        {error.isError && (
          <div>{error.message}</div>
        )}
        <Link onClick={handleSignOut} className="icon-signin" to="/login">
          <img src={SignOut} alt="sign-out" />
        </Link>
      </div>
      {renderUsers()}
    </div>
  )
}
