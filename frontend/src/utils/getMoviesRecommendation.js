import { apiInstance } from "./apiInstance";

export const getMoviesRecommendation = async ({ movie_id }) => {
  try {
    const response = await apiInstance(
      "movie/" + movie_id + "/recommendations"
    );

    return response.data.results;
  } catch (error) {
    console.log("Error pada getMoviesRecommendation :" + error);
  }
};
