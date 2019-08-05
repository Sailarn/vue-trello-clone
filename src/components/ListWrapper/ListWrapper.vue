<template>
  <div class="list-wrapper">
    <div class="list-group">
      <h4 class="list-name" :style="{backgroundColor: color}">{{name}} ({{listLength}})</h4>
      <DraggableList
        :list="listArray"
        @updateItem="onUpdateItem"
      />
      <AddCard
        :list="listArray"
        @updateItem="onUpdateItem"
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
        methods: {
            // update vuex store
            onUpdateItem(list) {
                const payload = {
                    list: list,
                    name: this.name
                };
                this.listArray = payload;
            }
        },
        computed: {
            // getter and setter of current list
            listArray: {
                get() {
                    return this.arr;
                },
                set(payload) {
                    this.$store.dispatch('mutateCard', payload);
                }
            },
            // to control count of cards in list
            listLength() {
                return this.arr.length;
            }
        }
    }

</script>
<style lang="sass" src="./list-style.sass"></style>
