import { apiInstance } from "./apiInstance";

export const getMoviesDetail = async ({ movie_id }) => {
  try {
    let response = await apiInstance.get("movie/" + movie_id);

    // console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error pada getMoviesByType : " + error);
  }
};
