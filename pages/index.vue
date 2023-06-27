<template>
  <section class="page page-index">
    <div class="container">
      <h1 ref="title" class="title">GeekEx / <span>Events</span></h1>
      <Events />
    </div>
  </section>
</template>

<script>
export default{
  mounted(){
    console.dir(this.$refs.title);
  }
}
</script>