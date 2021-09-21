<template>
  <div class="currencyBlockItem">
    <h6 class="currencyBlockItem__title">{{ Name }}</h6>
    <div class="currencyBlockItem__price">
      <span>{{ Nominal }} {{ CharCode }}</span>
      <div class="arrow">
        <span>&#10231;</span>
      </div>
      <span>{{ Value }} RUB</span>
      <span
        :class="[
          'currencyBlockItem__price--degradation',
          { green: Value - Previous > 0 },
        ]"
      >
        <span v-if="Value - Previous < 0">&#8595;</span>
        <span v-else>&#8593;</span>
        {{ (Value - Previous).toFixed(4) }}
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "currencyBlockItemComponent",
  props: {
    CharCode: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Value: {
      type: Number,
      required: true,
    },
    Previous: {
      type: Number,
      required: true,
    },
    Nominal: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.currencyBlockItem__title {
  margin-bottom: 15px;
  font-size: 14px;
  color: gray;
  font-weight: 500;
}

.currencyBlockItem__price {
  position: relative;
  display: flex;
  justify-content: space-between;

  &--degradation {
    color: red;
  }
  .green {
    color: green;
  }
}

.arrow {
  position: relative;
  max-height: 20px;
  font-size: 50px;

  span {
    position: absolute;
    left: -42px;
    bottom: 0;
    top: -29px;
  }
}
</style>
