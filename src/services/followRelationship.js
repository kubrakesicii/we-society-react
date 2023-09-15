import httpClient from "../utils/httpClient";

export const followRelationshipService = {
    follow : async (body) => httpClient.post("/FollowRelationships/Follow",body),
    unfollow : async (body) => httpClient.post("/FollowRelationships/UnFollow",body),
    getAllFollowers : async (userProfileId,pageIndex,pageSize) => httpClient.get(`/FollowRelationships/Followers?userProfileId=${userProfileId}&pageIndex=${pageIndex}&pageSize=${pageSize}`),
    getAllFollowings : async (userProfileId,pageIndex,pageSize) => httpClient.get(`/FollowRelationships/Followings?userProfileId=${userProfileId}&pageIndex=${pageIndex}&pageSize=${pageSize}`),
    getIsFollowing : async (followerId, followingId) => httpClient.get(`/FollowRelationships/IsFollow?followerId=${followerId}&followingId=${followingId}`),
}