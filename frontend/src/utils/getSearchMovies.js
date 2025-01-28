import { apiInstance } from "./apiInstance";

export const getSearchMovies = async ({ query }) => {
  try {
    const response = await apiInstance.get("/search/movie?query=" + query);

    return response.data.results;
  } catch (error) {
    console.log("Error pada getSearchMovies :" + error);
  }
};
