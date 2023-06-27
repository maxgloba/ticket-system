<template>
  <div class="alert">
    {{ alert }}
  </div>
</template>

<script>
export default{
  computed: {
    alert(){return this.$store.getters['global/getAlert']}
  },
  mounted(){
    setTimeout(()=>{
      this.$el.classList.add('alert__show')
    }, 50);
    setTimeout(()=>{
      this.$store.commit('global/setAlert', false)
      this.$el.classList.remove('alert__show')
    }, 2500);
  }
}
</script>

<style lang="scss" scoped>
.alert{
  position: fixed;
  left: 50%; top: 0;
  transform: translate(-50%, -200%);
  max-width: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, var(--prime), #414141);
  padding: 30px;
  font-size: clamp(24px, 2.7cqi, 40px);
  line-height: 1.4;
  color: #fff;
  text-align: center;
  box-shadow: 0 0 60px #000;
  border-radius: 16px;
  transition: .5s ease-in-out;
  &__show{
    transform: translate(-50%, 50%);
  }
}
</style>