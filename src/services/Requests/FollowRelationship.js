import { GetToken } from "../../utils/Token";
import { BASE_URL } from "../BaseUrl";


export const GetAllFollowers = async (userProfileId, pageIndex, pageSize) => {
    const response = await fetch(`${BASE_URL}/FollowRelationships/Followers?userProfileId=${userProfileId}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
    const resData = await response.json();

    console.log("Follow reqqq : ", resData.data);

    return resData.data.items;
}

export const GetAllFollowings = async (userProfileId, pageIndex, pageSize) => {
    const response = await fetch(`${BASE_URL}/FollowRelationships/Followings?userProfileId=${userProfileId}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
    const resData = await response.json();
    return resData.data.items;
}

export const FollowUser = async (followerId, followingId) => {
    const token = GetToken()
    await fetch(`${BASE_URL}/FollowRelationships/Follow`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify({followerId,followingId})
    });
}

export const UnfollowUser = async (followerId, followingId) => {
    const token = GetToken()
    await fetch(`${BASE_URL}/FollowRelationships/UnFollow`, {
        method:'POST',
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify({followerId,followingId})
    });
}