<script setup>
  import { provide, ref } from "vue";
  import {
    draggingItemToken,
    registerItemToken,
    updateListToken,
  } from "./constant";
  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => [],
    },
  });

  const emit = defineEmits(["update:modelValue"]);

  const draggingItem = ref(null);

  provide(draggingItemToken, draggingItem);

  provide(registerItemToken, () => {});

  provide(updateListToken, (draggingItem, dropTarget) => {
    emit(
      "update:modelValue",
      props.modelValue.reduce((acc, cur) => {
        if (cur === draggingItem) {
        } else if (cur === dropTarget) {
          if (dropTarget.children) {
            acc.push({
              ...dropTarget,
              children: [...dropTarget.children, draggingItem],
            });
          } else {
            acc.push({
              name: "文件夹",
              children: [draggingItem, dropTarget],
            });
          }
        } else {
          acc.push(cur);
        }
        return acc;
      }, [])
    );
  });
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
