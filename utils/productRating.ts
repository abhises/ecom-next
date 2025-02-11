export const productRating = (data: any) => {
  const ratings =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;
  return ratings;
};
