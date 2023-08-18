export const GetUser = () => {
  const user = {
    id:localStorage.getItem('id'),
    userProfileId:localStorage.getItem('userProfileId'),
    fullName:localStorage.getItem('fullName'),
    image:localStorage.getItem('image'),}
    if (user.id == null) return null;
    else return user;
  }

export const GetToken = () => {
    return localStorage.getItem('token') || null;
  }

// remove the token and user from the session storage
export const RemoveUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
   
  // set the token and user from the session storage
  export const SetUser = (token, user) => {
    console.log("token saving..",token);
    localStorage.setItem('token', token);
    localStorage.setItem('id', user.id);
    localStorage.setItem('userProfileId', user.userProfileId);
    localStorage.setItem('fullName', user.fullName);
    localStorage.setItem('image', user.image);
  }