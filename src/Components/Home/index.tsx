import React, { useContext, useEffect, useState } from "react"
import { UseFormRegister } from "react-hook-form";
import { UserAuth } from "../../contexts/AuthContext"
import db from '../../firebase.config';
import { Loader } from "../shared/Loader";
import { UserList } from "./UserList";
export const Home = ():JSX.Element => {
  const {user} = useContext(UserAuth);
  const [users, setUsers] = useState<any>([]);
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TO DO move retrieving data to file 
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await db.collection('users');
        const usersFirebase = await response.get();
        const usersList = usersFirebase.docs.map(item => {
          return item.data();
        });
        setUsers(usersList)
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
    fetchUsers()
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
