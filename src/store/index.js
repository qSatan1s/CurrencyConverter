import { createStore } from "vuex";
import * as getters from "./getters";
import * as actions from "./actions";
import mutations from "./mutations";

const state = {
  listCurrencies: [],
};

export default createStore({
  state,
  getters,
  actions,
  mutations,
});
