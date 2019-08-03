<template>
  <draggable
    class="draggable-wrapper"
    tag="div"
    v-model="innerList"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
  >
    <div
      class="list-group-item"
      v-for="element in innerList"
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
                drag: false,
                innerList: []
            };
        },
        // initialise new variable to manipulate with list
        created() {
            this.innerList = this.list;
        },
        // control drag'n'drop changes and emit event to parent component
        updated() {
            this.$emit('updateItem', this.innerList);
            this.$emit('updateList', this.innerList);
        },
        methods: {
            // emit delete event to parent component
            deleteItem(item) {
                this.innerList = this.innerList.filter(task => task.id !== item);
                this.$emit('deleteItem', this.innerList);
                this.$emit('updateList', this.innerList);
            }
        },
        computed: {
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
