export const getAllPostData = async () => {
  const responseOfPostData = await fetch(
    "https://dummyjson.com/posts?limit=150"
  );
  const postData = await responseOfPostData.json();
  return postData.posts;
};

export const addPost = async (postDetail) => {
  const responseOfPosts = await fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: postDetail.postTitle,
      body: postDetail.postBody,
      userId: 5,
    }),
  });
  const newPost = await responseOfPosts.json();
  newPost.username = "Krisha";
  return newPost;
};

export const deletePost = async (postId) => {
  fetch(`https://dummyjson.com/posts/${postId}`, {
    method: "DELETE",
  });
};

export const saveEditedPostData = async (editedFormData, postId, postsData) => {
  await fetch(`https://dummyjson.com/posts/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: editedFormData.postTitle,
      body: editedFormData.postBody,
    }),
  });

  const updatedPost = postsData.map((postData) => {
    if (postData.id === postId) {
      return {
        ...postData,
        title: editedFormData.postTitle,
        body: editedFormData.postBody,
      };
    }
    return postData;
  });
  return updatedPost;
};

export const getPostCommentById = async (postId) => {
  const responseOfComments = await fetch(
    `https://dummyjson.com/posts/${postId}/comments`
  );
  const commentData = await responseOfComments.json();
  return commentData.comments;
};

export const getPostDataByID = async (postId) => {
  const responseOfPost = await fetch(`https://dummyjson.com/posts/${postId}`);
  const pData = await responseOfPost.json();
  return pData;
};
