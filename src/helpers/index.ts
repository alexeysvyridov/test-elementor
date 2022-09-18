export const getStorage = (key:string) => {
  try {
    return JSON.parse(JSON.stringify(localStorage.getItem(key)))
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