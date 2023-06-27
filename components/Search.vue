<template>
  <form @submit="submit" class="bg--white">
    <input type="submit">
    <input type="search" v-model="search" placeholder="Search event">
  </form>
</template>
<script>
export default {
  data(){
    return {
      search: null
    }
  },
  methods: {
    submit(e){
      e.preventDefault()
      alert(this.search)
    }
  }
}
</script>
<style lang="scss" scoped>
form{
  overflow: hidden;
  width: 300px;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 2;
  animation: 1s ease-in-out alternate widthAnim;
  right: 0;
  @media(max-width:767px){
    right: -110px;
  }
  input{
    border: none;
    height: 70px;
    &[type="submit"]{
      width: 70px;
      font-size: 0;
    }
    &[type="search"]{
      width: 230px;
      padding: 0 15px 0 0;
      background: #1E2022;
      font-size: 16px;
    }
  }
}
@keyframes widthAnim {
  0% {
    max-width: 0px;
    opacity: 0;
  }
  25%{
    opacity: 1;
  }
  100% {
    max-width: 300px;
  }
}
.mode-dark{
  input{
    &[type="submit"]{
      background: #1E2022 url('../assets/img/icon-search.png') no-repeat center center;
    }
    &[type="search"]{
      background: #1E2022;
      color: #fff;
    }
  }
}
.mode-white{
  input{
    &[type="submit"]{
      background: #E0E0E0 url('../assets/img/icon-search.png') no-repeat center center;
    }
    &[type="search"]{
      background: #E0E0E0;
      color: #000;
    }
  }
}

</style>