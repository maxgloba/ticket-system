<template>
  <div class="event-banner">
    <h1 class="title" v-if="campaignId">{{ eventInfo.title }} \<span> {{ eventInfo.date }}</span></h1>
    <p>{{ eventInfo.desc }}</p>
    <!-- <a class="btn btn-visit" :href="eventInfo.link" target="_blank">visit event page</a> -->
  </div>
</template>
<script>
export default{
  props: ['campaignId'],
  computed: {
    eventInfo(){
      const eventsList = this.$store.getters['global/eventsList']
      let eventInfo
      Object.keys(eventsList).forEach(year => {
        if(eventsList[year].find(event => event.campignId == this.campaignId)){
          eventInfo = eventsList[year].find(event => event.campignId == this.campaignId)
        }
      })
      return eventInfo
    },
  },
}
</script>
<style lang="scss" scoped>
.event-banner{
  p{
    font-size: 16px;
    line-height: 21px;
    color: var(--opposite);
    @media(min-width:992px){
      font-size: 18px;
    }
  }
  .btn{
    &-group{
      display: flex;
    }
    &-export{
      background: #188038;
      border: none;
      font-weight: 500;
      font-size: 20px;
      color: #fff;
      padding: 15px 15px 15px 15px;
      display: flex;
      border-radius: 4px;
      line-height: 25px;
      transition: .5s ease;
      svg {
        height: 25px;
        width: auto;
        margin-right: 10px;
        fill: #fff;
      }
      &:not(:first-child){
        margin-left: 30px;
      }
      &:hover{
        opacity: .7;
      }
    }
    &-visit{
      display: block;
      padding: 15px 20px;
      background: var(--active);
      border-radius: 20px;
      font-weight: 700;
      font-size: 16px;
      line-height: 1;
      text-align: center;
      text-transform: uppercase;
      text-decoration: none;
      color: #000000;
      margin-bottom: 30px;
      width: 200px;
      margin-top: 15px;
      transition: .3s ease;
      &:hover{
        background: #414141;
        color: #fff;
      }
    }
  }
}
</style>