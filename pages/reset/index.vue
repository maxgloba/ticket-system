<template>
  <section class="reset">
    <div class="container">
      <h2 class="title title-center">Reset password</h2>
      <form @submit="submit" class="form form-short">
        <div class="field">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Your email" v-model="email" required/>
        </div>
        <div class="field">
          <input type="submit" value="Reset" />
          <p class="field-error" v-if="error" v-html="error"></p>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  data(){
    return{
      email: null,
      error: false,
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();
      this.$store.commit('global/setLoader', true);
      this.$axios.post(`${process.env.API}/login/reset`, {
        params: { email: this.email }
      })
        .then(response => {
          if(response.data.status === 'success'){
            this.$store.commit('global/setAlert', 'We have sent a letter with instructions to your email.')
          } else {
            throw response.data.msg
          }
        })
        .catch(err => {
          console.dir(err)
          this.$store.commit('global/setAlert', err)
        })
        .finally(() => {
          this.$store.commit('global/setLoader', false);
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.reset {
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>