import React from "react";
import { formatData, getStatus } from "../../../../helpers/dates";
import './style.css'


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
