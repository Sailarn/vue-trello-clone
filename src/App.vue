<!--Main page-->
<template>
  <section class="app" id="app">
    <div class="wrapper">
      <List name="ON-HOLD" color="orange" :arr="$store.state.onHoldCards"/>
      <List name="IN-PROGRESS" color="blue" :arr="$store.state.inProgressCards"/>
      <List name="NEEDS-REVIEW" color="#cece00" :arr="$store.state.needsReviewCards"/>
      <List name="APPROVED" color="green" :arr="$store.state.approvedCards"/>
    </div>
  </section>
</template>

<script>
    import ListWrapper from './components/ListWrapper/ListWrapper';

    export default {
        name: "main-page",
        components: {
            List: ListWrapper
        }
    };
</script>

<style lang="sass" src="./App.sass"></style>
