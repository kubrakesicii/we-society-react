export const GetUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
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
    localStorage.setItem('user', JSON.stringify(user));
  }
  