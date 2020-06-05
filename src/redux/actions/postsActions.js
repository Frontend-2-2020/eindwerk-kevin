import { API } from "../../libs/API";



export const fetchPost  = page => (dispatch) => {
     API.get("/api/posts?page="+page).then(response => {
      console.log('action', response.data.data);
      return dispatch({
        type: "FETCH_DATA",
        payload: response.data
      });
    })
}

export const addNewPost = (values) => dispatch =>{
  //console.log('user in create post', user)
  console.log('values in create post', values)

  // Values are holding Formik values, based on key-value of initialValues
  API.post("/api/posts", {"title": values.CREATE_POST_title, 'body': values.CREATE_POST_editor}).then(response => {
    console.log('addnewpost', response)
    return dispatch({
      type: "ADD_NEW_POST",
      payload: response.data
    })
  })
}

export const addComment = (values, postID) => dispatch => {
  // Needed data : body of comment + POST ID
  //API.post(/api/comments, {id: #, body: 'lorem'}
  API.post('/api/comments', {'blog_post_id': postID, 'body': values.ADD_COMMENT_editor}).then(
    response => {
      console.log(response)
      return dispatch({
        type: "ADD_COMMENT",
        payload: response.data
      })
    }
  )
}

// Is in actions because of reuse
export const deletePost = postID => dispatch => {
  API.delete(`/api/posts/${postID}`).then(
    response => {
      console.log(response)
      return dispatch(
        {
          type: "DELETE"
        }
      )
    }
  )
}

// export const fetchPost = param => async dispatch => {
//     await API.get("/api/posts?page="+param).then(response => {
//       console.log('action', response.data.data);
//       return dispatch({
//         type: "FETCH_DATA",
//         payload: response.data
//       });
//     })
// };