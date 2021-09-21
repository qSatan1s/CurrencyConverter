<template>
  <select v-model="selectedItem" @change="setSelectedItem">
    <option
      v-for="option in options"
      :key="option.ID"
      :value="option"
      :label="option.label"
    >
      {{ option.CharCode }}
    </option>
  </select>
</template>

<script>
import { defineComponent, watch, ref } from "vue";
export default defineComponent({
  name: "AppSelect",
  props: {
    modelValue: { type: Object },
    options: { type: Object || Array, required: true, default: () => [] },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const selectedItem = ref(props.modelValue);

    const setSelectedItem = () => {
      emit("update:modelValue", selectedItem.value);
    };

    watch(
      () => props.modelValue,
      () => {
        selectedItem.value = props.modelValue;
      }
    );

    return {
      selectedItem,
      setSelectedItem,
    };
  },
});
</script>
