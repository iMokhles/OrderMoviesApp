export const getImageUrl = ({
  size = 'w500',
  path,
}: {
  size?: string;
  path?: string;
}) => {
  return `http://image.tmdb.org/t/p/${size}/${path}`;
};
