import {followRelationshipService} from "../services/followRelationship"
import { useEffect, useState } from 'react'

const useFollowStatus = (followerId,followingId,control) => {
    const [isFollowing, setIsFollowing] = useState(false)

    const loadData = async() => {
        await followRelationshipService.getIsFollowing(followerId,followingId).then(({data}) => setIsFollowing(data))
    }

    useEffect(() => {
        loadData()
    },[isFollowing])

    return [isFollowing,setIsFollowing];
}

export default useFollowStatus;