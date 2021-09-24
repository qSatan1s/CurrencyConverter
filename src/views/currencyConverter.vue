<template>
  <section class="currencyConverter">
    <loader v-if="Object.keys(results).length === 0" />
    <div v-else class="currencyConverterItem__container">
      <currencyConverterItem
        v-model:value="firstAmount"
        v-model:currency="firstCurrency"
        :valutes="results"
      />
      <button @click="swapCurrency" class="currencyConverter--btn">
        &#10231;
      </button>
      <currencyConverterItem
        v-model:value="secondAmount"
        v-model:currency="secondCurrency"
        :valutes="results"
        readonly="readonly"
      />
    </div>
  </section>
</template>

<script>
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

import currencyConverterItem from "../components/currencyConverterItem.vue";
import loader from "../components/utils/loader";

export default defineComponent({
  name: "currencyConverter",
  components: {
    currencyConverterItem,
    loader,
  },
  setup() {
    const store = useStore();
    const listCurrencies = computed(() => store.getters.listCurrencies);
    const results = ref({});

    const firstCurrency = ref({});
    const secondCurrency = ref({});
    const firstAmount = ref("10");
    const secondAmount = ref();

    const swapCurrency = () => {
      [firstCurrency.value, secondCurrency.value] = [
        secondCurrency.value,
        firstCurrency.value,
      ];
    };

    watch(
      () => firstAmount.value,
      () => {
        calculateSecondAmount("first");
      }
    );

    watch(
      () => firstCurrency.value,
      () => {
        calculateSecondAmount("first");
      }
    );

    // watch(
    //   () => secondAmount.value,
    //   () => {
    //     calculateSecondAmount("second");
    //   }
    // );
    watch(
      () => secondCurrency.value,
      () => {
        // calculateSecondAmount("second");
        calculateSecondAmount("first");
      }
    );

    const calculateSecondAmount = (calculate) => {
      if (calculate === "first") {
        secondAmount.value = (
          (firstAmount.value * firstCurrency.value.Value) /
          secondCurrency.value.Value
        ).toFixed(1);
      }
      if (calculate === "second")
        firstAmount.value = (
          (secondAmount.value * secondCurrency.value.Value) /
          firstCurrency.value.Value
        ).toFixed(1);
    };

    onMounted(async () => {
      if (Object.keys(store.state.listCurrencies).length === 0) {
        await store.dispatch("getListCurrencies");
      }
      results.value = listCurrencies.value.Valute;
      firstCurrency.value = results.value.USD;
      secondCurrency.value = results.value.EUR;
    });
    return {
      firstCurrency,
      secondCurrency,
      firstAmount,
      secondAmount,

      results,
      listCurrencies,

      swapCurrency,
    };
  },
});
</script>

<style lang="scss">
.currencyConverter {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.currencyConverterItem__container {
  padding: 20px 10px;
  width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: gray;
  border-radius: 7px;
  -webkit-box-shadow: 2px 3px 20px 7px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 2px 3px 20px 7px rgba(0, 0, 0, 0.6);
  box-shadow: 2px 3px 20px 7px rgba(0, 0, 0, 0.6);
}
.currencyConverter--btn {
  font-size: 25px;
  border-radius: 100%;
  outline: none;
  border: 0;
  background: #3ab0c5;
  color: white;
  padding: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}
</style>
<script></script>
