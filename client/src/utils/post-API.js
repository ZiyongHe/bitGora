export function getUnownedPosts() {
  return fetch('/post/unowned').then((response) => response.json())
}
