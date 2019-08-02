<template>
  <div>
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
            };
        },
        methods: {
            addCard() {
                const payload = {
                    id: uuidv4().slice(0, 10),
                    text: this.cardInput,
                    name: this.name
                };
                this.list.push(payload);
                this.$store.commit('addCard', this.list);
                this.showInput = false;
                this.cardInput = '';
            }
        }
    }
</script>
