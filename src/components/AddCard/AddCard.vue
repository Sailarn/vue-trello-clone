<template>
  <div>
    <div v-if="showInput" class="input-wrapper">
        <textarea
          v-model="cardInput"
          placeholder="Type some text for this card..."
        />
      <span v-if="error" style="color: #f44336">Card cannot be empty</span>
      <div>
        <button @click="addCard">Add card</button>
        <span @click="closeInput">X</span>
      </div>
    </div>
    <button
      v-else @click="showInput = true"
      class="add-card-btn"
    >+ Add card
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
                cardInput: '',
                error: false
            };
        },
        methods: {
            // clear input when close button was clicked
            closeInput() {
                this.showInput = false;
                this.cardInput = '';
                this.error = false;
            },
            // add card to current list
            addCard() {
                if (this.cardInput === '') {
                    this.error = true;
                    return;
                }
                this.error = false;
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
