import { InfoProps } from "./interface";

export const paginate = (followers: InfoProps[]) => {
  const itemsPerPage = 25;
  const numberOfPages = Math.ceil(followers.length / itemsPerPage);

  const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return followers.slice(start, start + itemsPerPage);
  });

  return newFollowers;
};
