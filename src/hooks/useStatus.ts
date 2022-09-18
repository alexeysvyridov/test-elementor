import { useEffect, useState } from "react"

export const useStatus = () => {
    const [isOnline, setIsonline] = useState(false);

    useEffect(() => {
        const handleStatusChange = () => {
            setIsonline(navigator.onLine);
        };
        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);

        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        }
    }, [isOnline])
}