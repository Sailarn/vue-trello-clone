<template>
  <draggable
    class="draggable-wrapper"
    tag="div"
    v-model="listArray"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
  >
    <div
      class="list-group-item"
      v-for="element in listArray"
      :key="element.id"
    >
      <span class="delete-item" @click="deleteItem(element.id)">x</span>
      <span>Id: {{element.id}}</span>
      <span>{{element.text}}</span>
    </div>
  </draggable>
</template>
<script>
    import draggable from "vuedraggable";

    export default {
        name: "draggable-list",
        props: ['list'],
        components: {
            draggable
        },
        data() {
            return {
                drag: false
            };
        },
        // control drag'n'drop changes and emit event to parent component
        updated() {
            this.updateListArray(this.listArray);
        },
        methods: {
            // simplify this.listArray = this.listArray
            updateListArray(list) {
                this.listArray = list;
            },
            // set updated array to parent component
            deleteItem(item) {
                this.listArray = this.listArray.filter(task => task.id !== item);
            }
        },
        computed: {
            // get list from props and set when updated hook triggered
            listArray: {
                get() {
                    return this.list;
                },
                set(payload) {
                    this.$emit('updateItem', payload);
                }
            },
            // just drag options
            dragOptions() {
                return {
                    animation: 200,
                    group: "description",
                    disabled: false
                };
            }
        }
    }
</script>
<style lang="sass" src="./draggable-list.sass"></style>
