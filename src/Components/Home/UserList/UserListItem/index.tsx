import React from "react";
import './style.css'

const getStatus = (lastUpdate: number) => {
  const endTime = new Date();
  const inSeconds = (endTime.getTime() - new Date(lastUpdate).getTime()) / 1000;
  return inSeconds < 15 ? 'online' : 'offline';
}
const formatData = (date:number): null | string | number => {
  if (!date) return null
  console.log( new Date(date))
  return  new Date(date).toISOString().slice(0, 10);
}
export function UserListItem(props: any) {
  const { email, username, entrance, userIP, lastUpdate } = props.user;
  const status = getStatus(lastUpdate)
  return (
    <React.Fragment key={email}>
      <li className="user-list" onClick={props.onOpenModal}>
        <div>name: {username}</div>
        <div>entrance: {formatData(entrance)}</div>
        <div>last update: {formatData(lastUpdate)}</div>
        <div>IP: {userIP}</div>
        <div className={status}>{status}</div>
      </li>
    </React.Fragment>
  )
}
