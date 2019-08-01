<template>
  <div class="app">
    <List name="ON-HOLD" color="orange"/>
    <List name="IN-PROGRESS" color="blue"/>
    <List name="NEEDS-REVIEW" color="yellow"/>
    <List name="APPROVED" color="green"/>
  </div>
</template>

<script>
    import List from './components/List';

    export default {
        name: "main-page",
        components: {
            List
        },
        data() {
            return {}
        },
        methods: {},
        computed: {}
    };
</script>

<style lang="sass">
  *
    padding: 0
    margin: 0
    box-sizing: border-box

    body
      background-color: gray
      color: white
      padding-top: 50px

      button
        color: white
        outline: 0
        border: 0

      .app
        display: flex
        justify-content: space-around
        align-items: flex-start
        width: 100%
        height: 100%

</style>
