import { UserListItem } from "./UserListItem";
import './style.css'
import { Modal } from "../../shared/Loader/Modal";
import { useState } from "react";
import { findUserById } from "../../../api";

type UserListProps = {
  users: User[],
}
export function UserList({
  users
}: UserListProps): JSX.Element {
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);

  if (users.length === 0) {
    return <div> No data</div>
  } 
  
  const handleCloseClick = () => {
    setUserInfo(undefined)
  }

  const handleOpenClick = async (id: string) => {
    try {
     const userResp =  await findUserById(id)
      setUserInfo(userResp)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="user-list-container">
      <ul className="user-box">
        {users.map((user: User) => {
          return (
            <UserListItem 
              user={user} 
              key={user.email}
              onOpenModal={() => handleOpenClick(user?.id || '')}
            />
          )
        })}
      </ul>
      <Modal 
        isOpen={!!userInfo} 
        handleClose={handleCloseClick}
        renderHeader={() => {
          return (
            <h1>
              User card
            </h1>
          )
        }}
        renderAction={() => 
          <button className="action-button" type="button" onClick={handleCloseClick}>
            Close
          </button>
        }
        >
        <BodyModal userInfo={userInfo} />
      </Modal>
    </div>
  )
}
type BodyModalProps ={
  userInfo: User | undefined;
}
function BodyModal({
  userInfo
}: BodyModalProps): JSX.Element | null {
    if (!userInfo) {
      return null;
    }

    return (
      <>
        <div>name: {userInfo.username}</div>
        <div>email: {userInfo.email}</div>
        <div>user agent: {userInfo.userAgent}</div>
        <div>visited : {userInfo.visitsCount}</div>
        <div>entrance : {userInfo?.entrance?.slice(0, 10)}</div>
      </>
    )
}