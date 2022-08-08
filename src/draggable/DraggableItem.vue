<script setup>
  import { computed, inject, ref } from "vue";
  import { draggingItemToken, updateListToken } from "./constant";
  const props = defineProps({
    item: {
      type: Object,
      default: () => {},
    },
  });

  /**
   * 当前项是否为文件夹
   */
  const isFolder = computed(() => {
    return props.item.children;
  });

  const dragItemRef = ref();

  const containerDraggingItem = inject(draggingItemToken);

  const updateList = inject(updateListToken);

  function dragstartHandle(e) {
    // 隐藏当前项 设置拖动图片
    containerDraggingItem.value = props.item;
  }

  function dragenterHandle(e) {}

  function dragoverHandle(e) {
    const draggableItem = e.target.closest(".draggable-item");

    if (draggableItem) {
      draggableItem.classList.add("folder");
      draggableItem.style.transform = "scale(1.1)";
    }
  }

  function dragleaveHandle(e) {
    const draggableItem = e.target.closest(".draggable-item");

    if (draggableItem) {
      draggableItem.classList.remove("folder");
      draggableItem.style.transform = "";
    }
  }

  function dropHandle(e) {
    const draggableItem = e.target.closest(".draggable-item");

    if (draggableItem) {
      draggableItem.classList.remove("folder");
      draggableItem.style.transform = "";
    }
    updateList(containerDraggingItem.value, props.item);
  }

  function dragendHandle(e) {
    containerDraggingItem.value = null;
  }

  // Todo
  function dragImage() {
    const img = new Image();
    return img;
  }
</script>
<template>
  <div
    ref="dragItemRef"
    draggable="true"
    class="draggable-item"
    @dragstart="dragstartHandle"
    @dragenter.prevent="dragenterHandle"
    @dragover.prevent="dragoverHandle"
    @dragleave="dragleaveHandle"
    @dragend.prevent="dragendHandle"
    @drop="dropHandle"
  >
    <slot :isFolder="isFolder"></slot>
  </div>
</template>

<style scoped>
  .draggable-item {
    transition: all 0.3s ease;
    position: relative;
  }
  .draggable-item.folder::after {
    transition: all 0.3s ease;
    content: "";
    background: #eee;
    transform: scale(1.2);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: -1;
    border-radius: 8px;
  }
</style>
