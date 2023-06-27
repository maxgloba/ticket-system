<template>
  <section class="section-geekin">
    <div class="container">
      <h2 class="title title-center">Geek In</h2>
      <form @submit="submit" class="form form-short">
        <div class="field">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Your email" v-model="email" required />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input type="password" id="password" ref="pass" placeholder="*********" minlength="6" maxlength="20" v-model="password" required />
          <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click.prevent="togglePass" class="toggle-pass">
            <path d="M29.3465 0.65332L6.5 23.4998" stroke="var(--active)" stroke-linecap="round" />
            <path d="M5.88136 7.16877C12.5048 0.545307 23.2436 0.545305 29.8671 7.16877L34.7484 12.0501L29.8671 16.9315C23.2436 23.555 12.5048 23.555 5.88137 16.9315L1 12.0501L5.88136 7.16877Z" stroke="var(--active)" stroke-linecap="round" />
            <path d="M23.6582 12.0501C23.6582 15.2445 21.0686 17.8341 17.8742 17.8341C14.6798 17.8341 12.0902 15.2445 12.0902 12.0501C12.0902 8.85569 14.6798 6.2661 17.8742 6.2661C21.0686 6.2661 23.6582 8.85569 23.6582 12.0501Z" stroke="var(--active)" stroke-linecap="round" />
          </svg>
        </div>
        <div class="field">
          <input type="submit" value="Geek In" />
          <p><nuxt-link to="/reset">Forgot your password?</nuxt-link></p>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();
      this.$store.commit('global/setLoader', true);
      let userID
      this.$axios.post(`${process.env.API}/login`, {
        params: {
          email: this.email,
          password: this.password,
        }
      })
        .then(user => {
          if(user.data.status === "success") {
            this.$store.commit('global/setUser', user.data.msg)
            userID = user.data.msg.ID
            return this.$axios.get(`${process.env.API}/db/roles`)
          } else {
            throw user.data.msg
            console.dir(user.data);
          }
        })
        .then(roles => {
          roles.data.forEach(role => {
            const users = JSON.parse(role.users)
            if(users.includes(userID)){
              this.$store.commit('global/setRole', role.name)
            }
          })
        })
        .then(() => {
          this.$router.push(`/user/?id=${userID}`)
        })
        .catch(err => {
          console.dir(err)
          this.$store.commit('global/setAlert', err)
        })
        .finally(() => {
          this.$store.commit('global/setLoader', false);
        })
    },
    getRoles(ID){
      return this.$axios.get(`${process.env.API}/db/roles`)
        .then(roles => {
          roles.data.forEach(role => {
            const users = JSON.parse(role.users),
                  userId = Number(ID)
            if(users.includes(userId)){
              localStorage.role = role.name
              this.$store.commit('global/setRole', role.name)
            }
          })
        })
    },
    togglePass() {
      this.$refs.pass.type =
        this.$refs.pass.type === "password" ? "text" : "password";
    }
  }
}
</script>
<style lang="scss" scoped>
.section-geekin {
  padding-top: 50px;
  padding-bottom: 50px;
  .toggle-pass {
    position: absolute;
    right: 15px;
    top: 40px;
    z-index: 2;
    cursor: pointer;
    stroke-width: 2px;
    &:hover {
      path {
        stroke: #1e2022;
      }
    }
  }
}
</style>