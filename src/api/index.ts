export const getUserIp = async ():Promise<string | undefined> => {
    try {
      const data = await fetch('https://geolocation-db.com/json/');
      const response = await data.json();
      return response.IPv4;
    } catch (error) {
      console.log(error);
    }
  };