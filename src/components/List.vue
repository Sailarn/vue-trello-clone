<template>
  <div class="list-wrapper">
    <div class="list-group">
      <h4 class="list-name" :style="{backgroundColor: color}">{{name}} ({{list.length}})</h4>
      <draggable
        tag="div"
        v-model="list"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div
            class="list-group-item"
            v-for="(element, key) in list"
            :key="element.order"
          >
            <span class="delete-item" @click="deleteItem(element.order)">x</span>
            <span>Id: {{key}}</span>
            <span>{{element.name}}</span>
          </div>
        </transition-group>
      </draggable>
      <div v-if="showInput" class="input-wrapper">
        <textarea
          v-model="cardInput"
          placeholder="Ввести заголовок для этой карточки"
        />
        <div>
          <button @click="addCard">Добавить карточку</button>
          <span @click="showInput = false">X</span>
        </div>
      </div>
      <button
        v-else @click="showInput = true"
        class="add-card-btn"
      >+ Добавить карточку
      </button>
    </div>
  </div>
</template>

<script>
    import draggable from "vuedraggable";

    const message = [
        "vue.draggable",
        "draggable",
        "component",
        "for",
        "vue.js 2.0",
        "based",
        "on",
        "Sortablejs"
    ];
    export default {
        name: "list-component",
        props: ['name', 'color'],
        components: {
            draggable
        },
        data() {
            return {
                list: [],
                drag: false,
                showInput: false,
                cardInput: ''
            };
        },
        methods: {
            addCard() {
                this.list.push({name: this.cardInput, order: this.list.length + 1});
                this.showInput = false;
                this.cardInput = '';
            },
            deleteItem(item) {
                this.list = this.list.filter(task => task.order !== item)
            }
        },
        computed: {
            dragOptions() {
                return {
                    animation: 500,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            }
        }
    };
</script>

<style lang="sass">
  .list-wrapper
    min-width: 250px

    .list-group
      background-color: rgba(0, 0, 0, 0.7)
      width: 100%

      .add-card-btn
        width: 100%
        text-align: center
        background-color: transparent
        padding: 5px

        &:hover
          background-color: black

      .list-group-item
        display: flex
        flex-direction: column
        padding: 10px
        margin: 5px 10px
        position: relative
        background-color: rgba(0, 0, 0, 0.9)

        span
          background-color: transparent

        .delete-item
          position: absolute
          top: 2px
          right: 2px
          color: gray
          cursor: pointer

    .input-wrapper
      width: 100%
      padding: 5px 10px

      button
        padding: 2px 5px
        margin-right: 10px
        background-color: gray

      span
        color: gray
        cursor: pointer

      textarea
        width: 100%
        resize: none
        height: 100px
        background-color: gray
        border-color: gray
        padding: 5px
        margin-bottom: 5px

        &::placeholder
          color: white

    .list-name
      color: white
      padding: 5px
      font-size: 15px
      margin: 0

</style>
