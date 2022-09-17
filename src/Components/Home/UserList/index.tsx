import { UserListItem } from "./UserListItem";
import './style.css'
import { Modal } from "../../shared/Loader/Modal";
import { useState } from "react";
type UserListProps = {
  users: User[],
}
export function UserList({
  users
}: UserListProps): JSX.Element {
  const [userId, setUserId] = useState<string | null>(null)
  if (users.length === 0) {
    return <div> No data</div>
  } 
  
  const handleCloseClick = () => {
    setUserId(null)
  }
  const handleOpenClick = (user: string) => {
    setUserId(user)
  }

  return (
    <div className="user-list-container">
      <ul className="user-box">
        {users.map((user: User) => {
          console.log(user)
          return (
            <UserListItem 
              user={user} 
              key={user.email}
              onOpenModal={() => handleOpenClick(user.email)}
            />
          )
        })}
      </ul>
      <Modal 
        isOpen={!!userId} 
        handleClose={handleCloseClick}>
        item
      </Modal>
    </div>
  )
}