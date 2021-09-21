<template>
  <div class="currencyBlockItem">
    <h6 class="currencyBlockItem__title">{{ currency?.Name }}</h6>
    <div class="currencyConverterItem__block">
      <AppSelect v-model="selectOption" :options="valutes" />
      <input v-model="inputItem" type="Number" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import AppSelect from "./App/AppSelect.vue";
export default defineComponent({
  components: {
    AppSelect,
  },
  props: {
    value: {
      type: String || Number,
      default: null,
    },
    valutes: {
      type: Object,
      required: true,
      default: () => {},
    },
    currency: { type: Object },
  },
  emits: ["update:value", "update:currency"],
  setup(props, { emit }) {
    const useVModel = (props, propName) =>
      computed({
        get() {
          return props[propName];
        },
        set(value) {
          emit(`update:${propName}`, value);
        },
      });

    const selectOption = useVModel(props, "currency");
    const inputItem = useVModel(props, "value");

    return { selectOption, useVModel, inputItem };
  },
});
</script>

<style lang="scss" scoped>
.currencyBlockItem {
  width: 300px;
}

.currencyBlockItem__title {
  max-width: 200px;
  height: 30px;
}

.currencyConverterItem__block {
  display: flex;
  justify-content: space-between;
}
</style>
