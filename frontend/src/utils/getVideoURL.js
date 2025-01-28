import { apiInstance } from "./apiInstance";

export const getVideoURL = async ({ movie_id }) => {
  try {
    const response = await apiInstance.get(
      `${import.meta.env.VITE_BASE_URL_TMDB}movie/${movie_id}/videos`
    );

    return response.data.results[0].key;
  } catch (error) {
    console.log("Error pada getVideoURL : " + error);
  }
};
