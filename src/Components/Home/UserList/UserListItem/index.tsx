import React from "react";
// type UserListItem = {
//   user: User;
//   onSetUserId: () => void;
// }
export function UserListItem(props: any) {
  const { email, username, entrance, updatedAt } = props.user;
  return (
    <React.Fragment key={email}>
      <li className="user-list" onClick={props.onOpenModal}>
        <div>name: {username}</div>
        <div>email: {email}</div>
        <div>entrance {entrance}</div>
        <div>update at: {updatedAt}</div>
      </li>
    </React.Fragment>
  )
}
