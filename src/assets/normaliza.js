export default (s) => {
  return s.normalize("NFKD").replace(/\p{Diacritic}/gu, "").toUpperCase();
};
