import { BASE_URL } from "../BaseUrl";


export const InsertArticleClap = async (form) => {
    return await fetch(`${BASE_URL}/ArticleClaps`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify(form)
    });
}

