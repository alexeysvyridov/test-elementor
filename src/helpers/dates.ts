export const getStatus = (lastUpdate: number) => {
    const endTime = new Date();
    const inSeconds = (endTime.getTime() - new Date(lastUpdate).getTime()) / 1000;
    return inSeconds < 15 ? 'online' : 'offline';
  }

export const formatData = (date:number): null | string | number => {
    if (!date) return null
    return  new Date(date).toISOString().slice(0, 10);
  }