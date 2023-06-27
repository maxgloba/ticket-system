<template>
  <nav class="nav">
    <div class="nav-serach" :class="search ? 'active' : ''">
      <Transition name="slide-fade">
        <form class="nav-serach-form" v-if="search && role === 'admin' || role === 'manager'" @submit.prevent="searchTicket">
          <input type="text" placeholder="id" id="searchForm" v-model="searchForm"/>
          <input type="submit" value="">
        </form>
      </Transition>
      <button v-if="role && (role === 'admin' || role === 'manager')" @click.prevent="search = !search" class="btn btn-search" title="Search">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="var(--active)" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>
      </button>
    </div>
    <button v-if="role && $route.name !== 'geek-in'" @click.prevent="$router.push({ name: 'user', query: { id: user.ID }})" class="btn btn-user" title="Profile page">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="var(--active)" d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" /></svg>
    </button>
    <button v-if="role && $route.name !== 'geek-in'" @click.prevent="clearUser" class="btn btn-out" title="Log Out">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ff615d" d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z"/></svg>
    </button>
    <button v-if="!role && $route.name !== 'geek-in'" @click.prevent="goTo('/geek-in')" class="btn btn-in" title="Log In">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#4ee44e" d="M416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32zM342.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L242.8 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C355.1 266.1 355.1 245.9 342.6 233.4z" /></svg>
    </button>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      search: false,
      searchForm: null,
    };
  },
  methods: {
    searchTicket(){
      if(this.search){
        if(this.searchForm !== null && this.searchForm !== ''){
          this.$router.push({ name: 'ticket', query: { id: this.searchForm }})
        }
        this.search = false
      } else {
        this.search = true
      }
    },
    clearUser() {
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      this.$router.push("/geek-in");
      this.$store.commit('global/setRole', false)
      this.$store.commit('global/setUser', false)
    },
    goTo(link) {
      this.$router.push(link);
    },
  },
  computed: {
    role() {
      return this.$store.getters["global/getRole"];
    },
    user() {
      return this.$store.getters["global/getUser"];
    }
  }
}
</script>
<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  &-serach {
    height: 35px;
    position: absolute;
    top: 100%;
    right: 0;
    @media (min-width: 370px){
      position: relative;
    }
    @media (min-width: 400px){
      height: 40px;
    }
    &-form {
      height: 35px;
      width: 100%;
      max-width: 110px;
      @media (min-width: 400px){
        height: 40px;
      }
      input[type="text"] {
        border: none;
        background: #1e2022;
        border-radius: 20px;
        height: 100%;
        padding: 0 20px;
        color: #fff;
        width: 100%;
        font-size: 20px;
      }
      input[type="submit"]{
        position: absolute;
        top: 0;
        right: 0;
        width: 35px;
        height: 35px;
        border: none;
        background: transparent;
        border-radius: 50%;
        @media (min-width: 400px){
          width: 40px;
          height: 40px;
        }
      }
    }
    button {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}

.btn {
  background: none;
  border: 2px solid var(--active);
  border-radius: 50%;
  width: 35px;
  height: 35px;
  padding: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border 0.5s ease;
  @media (min-width: 400px){
    width: 40px;
    height: 40px;
  }
  &-out {
    border-color: #ff615d;
  }
  &-in {
    border-color: #4ee44e;
  }
  &:not(:first-child) {
    margin-left: 10px;
  }
  svg {
    display: block;
    width: 15px;
    height: auto;
    @media (min-width: 400px){
      width: 18px;
    }
    path {
      transition: fill 0.5s ease;
    }
  }
  &:hover {
    border-color: #fff;
    svg {
      path {
        fill: #fff;
      }
    }
  }
}
.active {
  transition: all 0.5s ease;
  .btn {
    border: none;
    pointer-events: none;
    svg {
      display: block;
      width: 18px;
      height: auto;
      path {
        transition: fill 0.5s ease;
        fill: #454a4e;
      }
    }
  }
}
.slide-fade-enter-active {
  animation: scale-up-hor-right 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
.slide-fade-leave-active {
  animation: scale-down-hor-right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@keyframes scale-up-hor-right {
  0% {
    transform: scaleX(0.6);
    transform-origin: 100% 100%;
  }
  100% {
    transform: scaleX(1);
    transform-origin: 100% 100%;
  }
}
@keyframes scale-down-hor-right {
  0% {
    transform: scaleX(1);
    transform-origin: 100% 100%;
  }
  100% {
    transform: scaleX(0.85);
    transform-origin: 100% 100%;
  }
}
</style>