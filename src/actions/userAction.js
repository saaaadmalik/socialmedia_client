import * as UserApi from "../api/UserRequest";

export const updateUser = (id, formData)=> async (dispatch)=>{
    dispatch({type:"UPDATING_START"})
    try {
        const {data} = await UserApi.updateUser(id,formData);
        console.log(data);
        dispatch({type:"UPDATING_SUCCESS", data:data})
    } catch (error) {
        console.log(error);
        dispatch({type:"UPDATING_FAIL"})
        
    }
}

export const followUser = (id,data) =>async (dispatch)=>{
    try {
       const response = await UserApi.followUser(id,data)
    //    console.log(response)
        dispatch({type:"FOLLOW_USER", data:response.data.followingUser.following})
    } catch (error) {
        console.log(error)
        
    }
}
export const unfollowUser = (id,data) =>async (dispatch)=>{
    try {
        const response = await UserApi.unfollowUser(id,data)
        // console.log(response)
        dispatch({type:"UNFOLLOW_USER", data:response.data.followingUser.following})
    } catch (error) {
        console.log(error)
        
    }
}
