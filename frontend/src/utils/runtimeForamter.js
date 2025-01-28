export const runtimeFormatter = (menit) => {
  const jam = Math.floor(menit / 60); // Konversi menit ke jam
  const menitSisa = menit % 60; // Sisa menit setelah dihitung jam
  const hasil = [];

  if (jam > 0) hasil.push(`${jam}j`);
  if (menitSisa > 0) hasil.push(`${menitSisa}m`);

  return hasil.join(" ") || "0m";
};
