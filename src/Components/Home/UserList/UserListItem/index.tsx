import React from "react";
import './style.css'

const getStatus = (lastUpdate: number) => {
  const endTime = new Date();
  const inSeconds = (endTime.getTime() - new Date(lastUpdate).getTime()) / 1000;
  return inSeconds < 15 ? 'online' : 'offline';
}

export function UserListItem(props: any) {
  const { email, username, entrance, updatedAt, userIP, lastUpdate } = props.user;
  const status = getStatus(lastUpdate)
  return (
    <React.Fragment key={email}>
      <li className="user-list" onClick={props.onOpenModal}>
        <div>name: {username}</div>
        <div>entrance: {entrance}</div>
        <div>update at: {updatedAt}</div>
        <div>IP: {userIP}</div>
        <div className={status}>{status}</div>
      </li>
    </React.Fragment>
  )
}
