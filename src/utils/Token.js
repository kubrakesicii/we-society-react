export const getUser = () => {
  const user = {
    id:localStorage.getItem('id'),
    userProfileId:localStorage.getItem('userProfileId'),
    fullName:localStorage.getItem('fullName'),
    image:localStorage.getItem('image')}
    if (user.id == null) return null;
    else return user;
  }

export const getToken = () => {
    return localStorage.getItem('token') || null;
  }

// remove the token and user from the session storage
export const removeUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('userProfileId');
    localStorage.removeItem('fullName');
    localStorage.removeItem('image');
  }
   
  // set the token and user from the session storage
  export const setUser = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('id', user.id);
    localStorage.setItem('userProfileId', user.userProfileId);
    localStorage.setItem('fullName', user.fullName);
    localStorage.setItem('image', user.image);
  }