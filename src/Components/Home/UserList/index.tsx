import { UserListItem } from "./UserListItem";

type UserListProps = {
  users: User[],
}
export function UserList({
  users
}: UserListProps): JSX.Element {
  if (users.length === 0) {
    return <div> No data</div>
  } 
  
  return (
    <ul>
      {users.map((user: User) => {
        console.log(user)
        return (
          <UserListItem user={user} key={user.email} />
        )
      })}
    </ul>
  )
}