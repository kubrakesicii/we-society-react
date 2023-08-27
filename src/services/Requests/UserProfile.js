import { GetToken } from "../../utils/Token";
import { BASE_URL } from "../BaseUrl";

export const GetUserProfile = async (id) => {
    const response = await fetch(`${BASE_URL}/UserProfiles/${id}`)
    const resData = await response.json();
    return resData.data;
}

export const UpdateUserProfile = async (id,form) => {
    const token = GetToken();
    const formData = new FormData();

    formData.append('fullName', form.fullName)
    formData.append('bio', form.bio)
    formData.append('github', form.github)
    formData.append('linkedin', form.linkedin)
    formData.append('image', form.image)

    return await fetch(`${BASE_URL}/UserProfiles/${id}`, {
        method:'PUT',
        headers:{
            //'Content-type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        body:formData
    }).then(res => res.json());
}