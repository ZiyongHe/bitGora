/* Functions to format post data */

export function markOwnedPosts(username, posts) {
  return posts.map((post) => ({
    postData: post,
    owned: username === post.userName,
  }))
}
