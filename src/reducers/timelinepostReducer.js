const timelinepostReducer = (
    state = { posts: [], loading: false, error: false},
    action
) => {
    switch (action.type) {
        case "RETREIVING_START":
            return { ...state, loading: true, error: false }
        case "RETREIVING_SUCCESS":
            return { ...state, posts: [...action.data], loading: false, error: false }
        case "RETREIVING_FAIL":
            return { ...state, loading: false, error: true }
        default:
            return state;
    }
}
export default timelinepostReducer;