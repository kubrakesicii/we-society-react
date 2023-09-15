import httpClient from "../utils/httpClient";

export const articleService = {
    getAll: (pageIndex,pageSize,categoryId) => httpClient.get(`/Articles?pageIndex=${pageIndex}&pageSize=${pageSize}&categoryId=${categoryId}`),
    getAllPopulars: (categoryId) => httpClient.get(`/Articles/Popular?categoryId=${categoryId}`),
    getAllByUser: (pageIndex,pageSize,userProfileId) => httpClient.get(`/Articles/ByUser?pageIndex=${pageIndex}&pageSize=${pageSize}&userProfileId=${userProfileId}`),
    getAllDraftsByUser: (pageIndex,pageSize,userProfileId) => httpClient.get(`/Articles/Drafts?pageIndex=${pageIndex}&pageSize=${pageSize}&userProfileId=${userProfileId}`),
    getById: (id) => httpClient.get(`/Articles/${id}`),
    insert: (form) => {
        httpClient.postForm("/Articles",{
            title : form.title,
            mainImage:form.mainImage,
            content:form.content,
            userProfileId:form.userProfileId,
            categoryId:form.categoryId,
            isPublished:form.isPublished
        })
    },
    update: (id,form) => {
        httpClient.putForm(`Articles/${id}`,{
            title : form.title,
            mainImage:form.mainImage,
            content:form.content,
            categoryId:form.categoryId,
        })
    }
}