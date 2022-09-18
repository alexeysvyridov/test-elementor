import React, { useContext, useEffect, useRef, useState } from "react"
import { getUsers, updateUser } from "../../api";
import { UserAuth } from "../../contexts/AuthContext"
import { Loader } from "../shared/Loader";
import { UserList } from "./UserList";
const MS = 5000; 

export const Home = ():JSX.Element => {
  const {user} = useContext(UserAuth);
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
      fetchUsers();
      updateUser({
        id: user?.id,
        lastUpdate : new Date().getTime(),
      })
    }, MS);

    return () => clearInterval(timeout)
  }, [])

  const renderUsers = () => {
    if (isLoading) { 
      return <Loader />
    }

    return <UserList users={users} />
  }
  return (
    <div className="main">
      <h1>Hello {user?.username}</h1>
      {renderUsers()}
    </div>
  )
}
