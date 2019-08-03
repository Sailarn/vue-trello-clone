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
        props: ['list', 'name'],
        data() {
            return {
                showInput: false,
                cardInput: ''
            };
        },
        methods: {
            closeInput() {
                this.showInput = false;
                this.cardInput = '';
            },
            addCard() {
                const itemCard = {
                    id: uuidv4().slice(0, 10),
                    text: this.cardInput,
                };
                this.list.push(itemCard);
                const payload = {
                    list: this.list,
                    name: this.name
                };
                this.$store.dispatch('mutateCard', payload);
                this.showInput = false;
                this.cardInput = '';
            }
        }
    }
</script>
<style lang="sass" src="./add-card.sass"></style>
