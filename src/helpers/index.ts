export const getStorage = (key:string) => {
  try {
    if (localStorage.getItem(key) !== null) {
      return JSON.parse(localStorage.getItem(key)!)
    }
    return null
  } catch (error) {
    console.log(error);
  }
}
export const setStorage = (key:string, data: User) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.log(error);
  } 
}
export const resetStorage = () => {
  try {
    localStorage.clear()
  } catch (error) {
    console.log(error);
  } 
}