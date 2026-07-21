export function getAvatarUrl(
  avatar?: string
) {
  if (!avatar) return "";

  // already full url
  if (
    avatar.startsWith("http://") ||
    avatar.startsWith("https://")
  ) {
    return avatar;
  }

  return `${import.meta.env.VITE_API_URL}${avatar}`;
}