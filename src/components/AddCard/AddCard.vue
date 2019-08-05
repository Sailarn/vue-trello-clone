<template>
  <div>
    <div v-if="showInput" class="input-wrapper">
        <textarea
          v-model="cardInput"
          placeholder="Ввести заголовок для этой карточки"
        />
      <div>
        <button @click="addCard">Добавить карточку</button>
        <span @click="closeInput">X</span>
      </div>
    </div>
    <button
      v-else @click="showInput = true"
      class="add-card-btn"
    >+ Добавить карточку
    </button>
  </div>
</template>
<script>
    import draggable from "vuedraggable";
    import uuidv4 from 'uuid/v4';

    export default {
        name: "add-card",
        components: {
            draggable
        },
        props: ['list'],
        data() {
            return {
                showInput: false,
                cardInput: ''
            };
        },
        methods: {
            // clear input when close button was clicked
            closeInput() {
                this.showInput = false;
                this.cardInput = '';
            },
            // add card to current list
            addCard() {
                const itemCard = {
                    id: uuidv4().slice(0, 10),
                    text: this.cardInput,
                };
                this.listArray.push(itemCard);
                this.setUpdatedList(this.listArray);
                this.showInput = false;
                this.cardInput = '';
            },
            // just to simplify update this.listArray = this.listArray
            setUpdatedList(list) {
                this.listArray = list;
            }
        },
        computed: {
            // get list from props and emit update event to parent component
            listArray: {
                get() {
                    return this.list;
                },
                set(payload) {
                    this.$emit('updateItem', payload);
                }
            }
        }
    }
</script>
<style lang="sass" src="./add-card.sass"></style>
