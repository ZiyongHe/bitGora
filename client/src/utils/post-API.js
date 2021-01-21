export function getAllPosts() {
  return fetch('/post/').then((response) => response.json())
}
