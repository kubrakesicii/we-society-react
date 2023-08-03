import { BASE_URL } from "../BaseUrl";


export const GetAllFollowers = async (userProfileId, pageIndex, pageSize) => {
    const response = await fetch(`${BASE_URL}/FollowRelationships/Followers?userProfileId=${pageIndex}&pageSize=${pageSize}`)
    const resData = await response.json();
    return resData.data.items;

}