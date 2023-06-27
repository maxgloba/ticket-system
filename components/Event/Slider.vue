<template>
  <div class="slider" v-if="campaignId">
    <vue-tiny-slider v-bind="tinySliderOptions">
      <div class="item" v-for="item in eventInfo.schedule" :key="item.title">
        <div class="slider-item">
          <h3>{{ item.title }}</h3>
          <h4 v-if="item.subtitle">{{ item.subtitle }}</h4>
          <ul class="slider-list">
            <li v-for="listItem in item.list" v-html="listItem" :key="listItem"></li>
          </ul>
          <h5 v-if="item.listsub">{{ item.listsub }}</h5>
        </div>
      </div>
    </vue-tiny-slider>
  </div>
</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.1/tiny-slider.css"
        }
      ]
    }
  },
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
  data() {
    return {
      tinySliderOptions: {
        mouseDrag: true,
        items: 1,
        swipeAngle: 45,
        gutter: 15,
        loop: false,
        controls: false,
        nav: true,
        responsive: {
          768: {
            items: 2
          },
          992: {
            items: 3
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
.slider{
  position: relative;
  margin-bottom: 50px;
  margin-top: 50px;
  .tns{
    &-nav{
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      button{
        display: inline-block;
        border: 1px solid var(--active);
        border-radius: 10px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        padding: 0;
        background: #fff;
        margin: 0 6px;
        &.tns-nav-active{
          background: var(--active);
        }
      }
    }
  }
  &-item{
    background: #000;
    border-radius: 15px;
    color: #fff;
    padding: 30px;
    user-select: none;
  }
  &-list{
    list-style: disc;
    padding-left: 15px;
    li{
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 1.4;
      @media(min-width:1200px){
        font-size: 14px;
      }
    }
  }
  h3{
    color: var(--active);
    font-size: 30px;
    margin-bottom: 30px;
  }
  h4{
    font-size: 26px;
    color: var(--active);
    margin-bottom: 30px;
  }
  h5{
    color: var(--active);
    font-size: 14px;
  }
}
</style> 