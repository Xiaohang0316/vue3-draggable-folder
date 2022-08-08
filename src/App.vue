<script setup>
  import { ref, watch } from "vue";

  const list = ref([
    { name: "QQ", color: "blue" },
    { name: "WeChat", color: "green" },
    { name: "Weibo", color: "yellow" },
    { name: "Twitter", color: "black" },
    { name: "Facebook", color: "red" },
  ]);

  watch(list, (val, oldVal) => {
    console.log("oldValue:", oldVal, "\nnewValue:", val);
  });
</script>

<template>
  <draggable-container class="flex items-center gap-4" v-model="list">
    <draggable-item
      v-for="item in list"
      :key="item"
      :item="item"
      class="flex flex-col items-center gap-2"
    >
      <template #default="{ isFolder }">
        <template v-if="isFolder">
          <ul class="bg-gray-100 grid w-12 h-12 p-1 grid-cols-3">
            <li v-for="childItem in item.children" style="transform: scale(1)">
              <div
                class="w-3 h-3 rounded-sm"
                :style="{
                  backgroundColor: childItem.color,
                }"
              ></div>
            </li>
          </ul>
          <span>{{ item.name }}</span>
        </template>
        <template v-else>
          <div
            class="w-12 h-12 rounded"
            :style="{
              backgroundColor: item.color,
            }"
          ></div>
          <span>{{ item.name }}</span>
        </template>
      </template>
    </draggable-item>
  </draggable-container>
</template>

<style scoped></style>
