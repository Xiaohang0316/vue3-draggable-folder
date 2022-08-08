import DraggableContainer from "./DraggableContainer.vue";
import DraggableItem from "./DraggableItem.vue";
export const DraggablePlugin = {
  install(app) {
    app.component("draggable-container", DraggableContainer);
    app.component("draggable-item", DraggableItem);
  },
};
