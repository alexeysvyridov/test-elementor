import { useQuery } from "react-query"
import { getUsers } from "../api"
import { FirebaseError } from '@firebase/util'

const MS = 5000; 
type UseGetUsersQuery = {
    users: User[],
    isError: boolean,
    isLoading: boolean,
    error: FirebaseError | null,
}
export const useGetUsersQuery = (callbackSuccess: () => void): UseGetUsersQuery => {
    const { data, error, isError, isLoading } = useQuery<unknown, FirebaseError, User[]>(['users'], async () => {
        const users = await getUsers()
        return users
    }, {
        refetchInterval: MS,
        onSuccess: callbackSuccess,
    })
   
    return {
        users: data || [],
        isError,
        error,
        isLoading,
    }
}