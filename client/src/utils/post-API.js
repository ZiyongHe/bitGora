export function getUnownedPosts() {
  return fetch('/post/unowned').then((response) => response.json())
}

export function getOwnedPosts() {
  return fetch('/post/owned').then((response) => response.json())
}
