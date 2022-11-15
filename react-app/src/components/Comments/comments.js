
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom"
import { getAllComments, createComment, deleteComment } from "../../store/comments";
import LoginForm from "../auth/LoginForm";
// import { getOneTrack } from '../../store/tracks';
import "./comments.css"

const AllComments = () => {
  const dispatch = useDispatch();
  const { trackId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  console.log("THIS IS SESSION USER IN ALLCOMMENTS", sessionUser)
  // const track = useSelector(state => state.tracks)

  const comments = useSelector((state) => state.comments.comments);
  const commentsArr = Object.values(comments);
  // console.log("COMMENTS", commentsArr);

  const [userComments, setUserComments] = useState("");


  useEffect(() => {
    dispatch(getAllComments(trackId))
    // dispatch(getOneTrack(trackId))
  }, [dispatch, trackId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      comment_body: userComments
      // user_id:
    };
    await dispatch(createComment(trackId, newComment))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <form className="comment-form-parent" onSubmit={handleSubmit}>
        {/* <h3 className="comment-message">Add a Review Meow!!!</h3> */}
        {/* {showErrors &&
          <ul className="form-errors">
            {validationErrors.length > 0 &&
              validationErrors.map(error => (
                <li key={error}>{error}</li>
              ))}
          </ul>
        } */}
        <div className="comment-form">
          <label>
            <textarea
              placeholder="Add a comment"
              type="text"
              className="comment-input"
              value={userComments}
              onChange={(e) => setUserComments(e.target.value)}
            />
          </label>
        </div>
        <button className="button-create-comment" type="submit"> Submit</button>
        {/* <button type="button" className="button-create-comment" onClick={handleCancel}>Cancel</button> */}
      </form>
    )
  } else {
    sessionLinks = (
      <div>
        <div>
          Sign In to Comment!
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    )
    // } else {
    //   sessionLinks = (
    //     <form className="comment-form-parent" onSubmit={handleSubmit}>
    //       {/* <h3 className="comment-message">Add a Review Meow!!!</h3> */}
    //       {/* {showErrors &&
    //         <ul className="form-errors">
    //           {validationErrors.length > 0 &&
    //             validationErrors.map(error => (
    //               <li key={error}>{error}</li>
    //             ))}
    //         </ul>
    //       } */}
    //       <div className="comment-form">
    //         <label>
    //           <textarea
    //             placeholder="Add a comment"
    //             type="text"
    //             className="review-input"
    //             value={userComments}
    //             onChange={(e) => setUserComments(e.target.value)}
    //           />
    //         </label>
    //         <label>
    //           <text
    //             placeholder="User Name"
    //             type="text"
    //             className="review-input"
    //             value={userName}
    //             onChange={(e) => setUserName(e.target.value)}
    //           />
    //         </label>
    //       </div>
    //       <button className="button-create-spot" type="submit"> Add Review</button>
    //       {/* <button type="button" className="button-create-comment" onClick={handleCancel}>Cancel</button> */}
    //     </form>
  }

  return (
    <div className="comments-mother">
      <div className="comments-text">
        Comments
      </div>
      <div>
        {sessionLinks}
      </div>
      <div>
        {commentsArr.map((comment) => {
          return (
            <div className="comment-display">
              <div className="individual-comment-display" key={comment?.id}>
                <div>{comment?.User?.username}</div>
                <div>{comment.created_at.split(' ').slice(0, -2).join(' ')}</div>
                <div>{comment.comment_body} </div>
              </div>
              {sessionUser?.id === comment.user_id && (
                <button className="delete-comment-button"
                  onClick={async () => await dispatch(deleteComment(comment?.id))}>
                  Delete
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllComments;
