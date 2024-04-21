export const addCommentData = async (commentDetail, postId) => {
  const responseOfComments = await fetch("https://dummyjson.com/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      body: commentDetail,
      postId: parseInt(postId),
      userId: 5,
    }),
  });

  const newCommentData = await responseOfComments.json();
  return newCommentData;
};

export const deletCommentData = (commentId) => {
  fetch(`https://dummyjson.com/comments/${commentId}`, {
    method: "DELETE",
  });
};

export const saveEditedCommentData = async (
  commentId,
  editedCommentFormData,
  commentsData
) => {
  await fetch(`https://dummyjson.com/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      body: editedCommentFormData.editedCommentData,
    }),
  });

  const updatedCommentData = commentsData.map((commentData) => {
    if (commentData.id === commentId) {
      return { ...commentData, body: editedCommentFormData.editedCommentData };
    }
    return commentData;
  });
  return updatedCommentData;
};
