<template>
  <div class="events">
    <div v-for="year in Object.keys(events).slice().reverse()" class="events-wrap">
      <h2 class="events-year">{{ year }}</h2>
      <div class="events-list">
        <nuxt-link class="events-item" v-for="event in events[year]" :to="{ path: '/event', query: { id: event.campignId }}" :key="`event_${event.campignId}`">
          <img :src="event.img" :alt="event.title">
          <!-- <h3>{{ event.title }}</h3> -->
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    events(){return this.$store.getters['global/eventsList']}
  }
}
</script>
<style lang="scss" scoped>
.events{
  padding-bottom: clamp(50px, cqi(100), 100px);
  &-wrap{
    position: relative;
    padding-top: clamp(80px, cqi(160), 160px);
    &:not(:first-child){
      margin-top: 50px;
    }
  }
  &-list{
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    @media(min-width:768px){
      grid-template-columns: repeat(2, 1fr);
    }
    @media(min-width:992px){
      grid-template-columns: repeat(3, 1fr);
    }
    @media(min-width:1200px){
      grid-template-columns: repeat(4, 1fr);
    }
  }
  &-year{
    font-weight: 900;
    font-size: clamp(100px, cqi(200), 200px);
    position: relative;
    margin-bottom: 15px;
    color: var(--active);
    position: absolute;
    top: 0;
    opacity: .3;
  }
  &-item{
    position: relative;
    color: var(--opposite);
    mask: url('@/assets/img/frame.svg') no-repeat 0 0 / 100% 100%;
    transition: .5s ease-out;
    img{
      display: block;
      width: 100%;
      height: auto;
      filter: brightness(0.8);
      transition: .5s ease;
      position: relative;
      z-index: 2;
    }
    &:hover{
      transform: translateY(-15px);
      img{
        filter: brightness(1);
      }
    }
  }
}
</style>