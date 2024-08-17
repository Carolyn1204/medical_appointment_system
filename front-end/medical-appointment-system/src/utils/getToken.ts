export const getUserDataFromLocalStorage = () => {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      throw new Error('userData not found in local storage');
    }
  
    const userData = JSON.parse(userDataString);
    const { uid, token } = userData;
  
    return { uid, token };
  };