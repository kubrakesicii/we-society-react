
export const PostForm = async (url,form) => {
    const postData = Object.fromEntries(form);
    const token = getToken();

    await fetch(url, {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify(postData)
    });
}


