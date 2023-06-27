<template>
  <main>
    <Header />
    <Nuxt />
    <Loader v-if="loader" />
    <Alert v-if="alert" />
  </main>
</template>

<script>
export default {
  computed: {
    loader() {
      return this.$store.getters['global/getLoader']
    },
    alert() {
      return this.$store.getters['global/getAlert']
    },
  },
  mounted(){
    let role = false
    if(localStorage.role && localStorage.role != 'false'){
      role = localStorage.role
    }
    this.$store.commit('global/setRole', role)
    this.$store.commit('global/setUser', localStorage.user ? JSON.parse(localStorage.user) : false);
  }
}
</script>
