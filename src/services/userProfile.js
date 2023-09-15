import httpClient from "../utils/httpClient";

export const userProfileService = {
    getById : async (id) => httpClient.get(`/UserProfiles/${id}`),
    update : async (id,form) => httpClient.putForm(`/UserProfiles/${id}`,{
        fullName:form.fullName,
        bio:form.bio,
        github:form.github,
        linkedin:form.linkedin,
        image:form.image
    })
}