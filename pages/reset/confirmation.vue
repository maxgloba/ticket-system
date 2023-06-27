<template>
  <section class="reset">
    <div class="container">
      <h2 class="title title-center" v-html="msg"></h2>
    </div>
  </section>
</template>
<script>
export default {
  data(){
    return{
      msg: 'Password confirmation...',
      error: false,
    }
  },
  methods: {
    submitConfirmation(id, token){
      this.$store.commit('global/setLoader', true);
      this.$axios.post(`${process.env.API}/login/reset-confirmation`, {
        params: {
          id: id,
          token: token,
        }
      })
        .then(response => {
          if(response.data.status === 'success'){
            this.msg = response.data.msg
          } else {
            throw response.data.msg
          }
        })
        .catch(err => {
          console.dir(err)
          this.$store.commit('global/setAlert', err)
        })
        .finally(() => {
          this.$store.commit('global/setLoader', false)
        })
    },
  },
  mounted(){
    if(this.$route.query.id && this.$route.query.token){
      this.submitConfirmation(this.$route.query.id, this.$route.query.token)
    } else {
      this.$store.commit('global/setAlert', 'Please reset your password')
      setTimeout(()=>{
        this.$router.push('/reset')
      }, 500);
    }
  }
}
</script>
<style lang="scss" scoped>
.reset {
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>