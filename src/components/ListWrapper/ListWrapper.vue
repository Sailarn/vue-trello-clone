<template>
  <div class="list-wrapper">
    <div class="list-group">
      <h4 class="list-name" :style="{backgroundColor: color}">{{name}} ({{listLength}})</h4>
      <draggable
        class="draggable-wrapper"
        tag="div"
        v-model="list"
        v-bind="dragOptions"
        @start="onDragStart"
        @end="onDragEnd"
      >
        <div
          class="list-group-item"
          v-for="element in list"
          :key="element.id"
        >
          <span class="delete-item" @click="deleteItem(element.id)">x</span>
          <span>Id: {{element.id}}</span>
          <span>{{element.text}}</span>
        </div>
      </draggable>
      <AddCard :list="list"/>
    </div>
  </div>
</template>

<script>
    import draggable from "vuedraggable";
    import AddCard from "../AddCard/AddCard";

    export default {
        name: "list-component",
        props: ['name', 'color', 'arr'],
        components: {
            draggable,
            AddCard
        },
        data() {
            return {
                list: [],
                drag: false,
                length: 0
            };
        },
        created() {
            this.list = this.arr;
            this.length = this.list.length;
        },
        updated() {
            if (this.list.length !== this.length) {
                this.length = this.list.length;
                const payload = {
                    list: this.list,
                    name: this.name
                };
                this.$store.commit('addCard', payload);
            } else {
                this.length = this.list.length;
            }
        },
        methods: {
            onDragStart() {
                this.drag = true;
            },
            onDragEnd() {
                this.drag = false;
            },
            deleteItem(item) {
                this.list = this.list.filter(task => task.id !== item);
                this.$store.commit('addCard', this.list);
            }
        },
        computed: {
            listLength() {
                return this.list.length;
            },
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
<style lang="sass" src="./list-style.sass"></style>
