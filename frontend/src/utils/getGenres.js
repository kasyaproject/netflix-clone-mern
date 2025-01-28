export const getGenres = (genres) => {
  if (!Array.isArray(genres)) return ""; // Jika bukan array, kembalikan string kosong

  let result = [];

  genres.map((item, index) => {
    result += item.name;
    if (index < genres.length - 1) {
      result += ", ";
    }
  });

  return result;
};
