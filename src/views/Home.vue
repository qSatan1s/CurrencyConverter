<template>
  <section class="allCurrencies">
    <loader v-if="Object.keys(results).length === 0" />
    <div v-else class="currencyBlock">
      <input
        placeholder="введите название валюты"
        class="currencyBlock--input"
        type="text"
        v-model="searchValue"
      />
      <div class="currencyBlock__container">
        <currencyBlockItem
          v-for="currencyItem in results"
          :key="currencyItem.ID"
          :CharCode="currencyItem.CharCode"
          :Name="currencyItem.Name"
          :Value="currencyItem.Value"
          :Nominal="currencyItem.Nominal"
          :Previous="currencyItem.Previous"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, onMounted, computed, watch, ref } from "vue";
import { useStore } from "vuex";

import loader from "../components/utils/loader";
import currencyBlockItem from "../components/currencyBlockItem";

export default defineComponent({
  name: "Home",
  components: {
    currencyBlockItem,
    loader,
  },
  setup() {
    const store = useStore();
    const searchValue = ref("");
    const listCurrencies = computed(() => store.getters.listCurrencies);
    const results = ref({});
    watch(
      () => searchValue.value,
      () => {
        results.value = {};
        filterListCurrencies();
      }
    );

    const filterListCurrencies = () => {
      for (let key in listCurrencies.value.Valute) {
        if (
          listCurrencies.value.Valute[key].Name.toLowerCase().indexOf(
            searchValue.value.toLowerCase()
          ) !== -1 ||
          listCurrencies.value.Valute[key].CharCode.toLowerCase().indexOf(
            searchValue.value.toLowerCase()
          ) !== -1
        ) {
          results.value[key] = listCurrencies.value.Valute[key];
        }
      }
    };

    onMounted(() => {
      if (Object.keys(store.state.listCurrencies).length === 0) {
        store.dispatch("getListCurrencies");
        setTimeout(() => {
          results.value = listCurrencies.value.Valute;
        }, 200);
      } else {
        results.value = listCurrencies.value.Valute;
      }
    });
    return {
      listCurrencies,
      searchValue,
      results,
      filterListCurrencies,
    };
  },
});
</script>

<style lang="scss">
.allCurrencies {
  padding: 20px 0;
  display: flex;
  justify-content: center;
}

.currencyBlock {
  position: relative;
  margin: 0 20px;
  width: 400px;
}

.currencyBlock__container {
  max-height: 600px;
  overflow: auto;
}

.currencyBlock--input {
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 7px;
  border: 0;
  outline: none;
  font-size: 16px;
}
</style>
