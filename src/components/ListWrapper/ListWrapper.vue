<template>
  <div class="list-wrapper">
    <div class="list-group">
      <h4 class="list-name" :style="{backgroundColor: color}">{{name}} ({{listLength}})</h4>
      <DraggableList
        :list="list"
        @deleteItem="deleteItem"
        @updateItem="onUpdateItem"
        @updateList="onListUpdate"
      />
      <AddCard
        :list="list"
        :name="name"
      />
    </div>
  </div>
</template>

<script>
    import AddCard from "../AddCard/AddCard"; // component for adding new cards
    import DraggableList from "../DraggableList/DraggableList"; // component for showing cards and control them

    export default {
        name: "list-component",
        props: ['name', 'color', 'arr'],
        components: {
            DraggableList,
            AddCard
        },
        data() {
            return {
                list: [],
                drag: false,
                length: 0
            };
        },
        // when component created - set initial state (because we can't change state directly)
        created() {
            this.list = this.arr;
            this.length = this.list.length; // to see if state changed after drag'n'drop
        },
        methods: {
            // after event will be emitted on Draggable List - function will update global state
            onUpdateItem(list) {
                if (list.length !== this.length) {
                    this.length = list.length;
                    const payload = {
                        list: list,
                        name: this.name
                    };
                    this.$store.dispatch('mutateCard', payload);
                } else {
                    this.length = list.length;
                }
            },
            // work as previous function but delete card
            deleteItem(list) {
                const payload = {
                    list,
                    name: this.name
                };
                this.$store.dispatch('mutateCard', payload);
            },
            // event to update current list (to synchronise lists after drag'n'drop)
            onListUpdate(list) {
                this.list = list;
            }
        },
        computed: {
            // to control count of cards in list
            listLength() {
                return this.list.length;
            }
        }
    }

</script>
<style lang="sass" src="./list-style.sass"></style>
