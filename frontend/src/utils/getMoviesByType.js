import { apiInstance } from "./apiInstance";

export const getMoviesByType = async ({ moviesType }) => {
  try {
    let response = await apiInstance.get("/movie/" + moviesType);

    // console.log(response);
    return response.data.results;
  } catch (error) {
    console.log("Error pada getMoviesByType : " + error);
  }
};
