export const getListCurrencies = async ({ commit }) => {
  const result = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  commit("updateListCurrencies", await result.json());
};
