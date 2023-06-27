<template>
  <div class="dashboard-item" >
    <h3>{{ title }}</h3>
    <svg class="dashboard-panel svg---mjkYv" preserveAspectRatio="xMidYMid" viewBox="0 0 416 304" version="1.1">
       <defs>
          <mask :id="'needle-cutout-'+_uid">
             <rect x="0" y="0" width="416" height="304" fill="white"></rect>
             <g class="gaugeNeedle---Bf6ar gaugeNeedleReady---vE8IM dashboard-deg" :style="`transform-origin: 180px 180px; transform: rotate(${deg}deg);`">
                <path stroke="black" d="M180,180 L6,180" stroke-width="28" stroke-linecap="round"></path>
             </g>
          </mask>
          <mask :id="'arc-'+_uid">
             <rect x="0" y="0" width="416" height="304" fill="black"></rect>
             <g fill="white">
                <path shape-rendering="geometricPrecision" d="M360.892957,172.497655 C360.892957,174.210419 361.267535,179.926468 353.860758,179.926468 C332.401538,179.926468 316.13787,179.65628 304.863632,179.926468 C299.090443,180.064824 297.655366,175.358779 297.249428,170.765967 C292.470332,116.694446 245.506531,62.2625042 180.307016,62.2625042 C115.107492,62.2625042 68.29152,116.088698 65.3133757,170.765967 C65.1765603,173.27775 64.1058071,179.926468 56.2137975,179.926468 C48.321798,179.926468 24.7238988,180.091914 5.0397839,179.926468 C-0.610714294,179.878976 1.15844296,172.916837 1.15844296,170.765967 C1.15844296,84.8923197 76.0004606,0 180.107189,0 C284.213917,0 360.892957,84.4731364 360.892957,172.497655 Z"></path>
             </g>
          </mask>
       </defs>
       <g transform="translate(28, 0)">
          <g :mask="`url(#needle-cutout-${_uid})`">
             <g class="gaugeArc---f3i2z">
                <path fill="#1E2022" shape-rendering="geometricPrecision" d="M360.892957,172.497655 C360.892957,174.210419 361.267535,179.926468 353.860758,179.926468 C332.401538,179.926468 316.13787,179.65628 304.863632,179.926468 C299.090443,180.064824 297.655366,175.358779 297.249428,170.765967 C292.470332,116.694446 245.506531,62.2625042 180.307016,62.2625042 C115.107492,62.2625042 68.29152,116.088698 65.3133757,170.765967 C65.1765603,173.27775 64.1058071,179.926468 56.2137975,179.926468 C48.321798,179.926468 24.7238988,180.091914 5.0397839,179.926468 C-0.610714294,179.878976 1.15844296,172.916837 1.15844296,170.765967 C1.15844296,84.8923197 76.0004606,0 180.107189,0 C284.213917,0 360.892957,84.4731364 360.892957,172.497655 Z"></path>
             </g>
          </g>
          <g class="gaugeNeedle---Bf6ar gaugeNeedleReady---vE8IM dashboard-deg" :style="`transform-origin: 180px 180px; transform: rotate(${deg}deg);`">
             <circle fill="var(--active)" cx="180" cy="180" r="21" stroke-width="0"></circle>
             <path stroke="var(--active)" d="M180,180 L6,180" stroke-width="12" stroke-linecap="round"></path>
          </g>
          <text class="min---nwu3a" text-anchor="middle" x="30" y="220" fill="#fff">
             <tspan class="primaryNumberWrapper---ITslt">
                <tspan dx="0.05em">{{ minStr }}</tspan>
             </tspan>
          </text>
          <text class="max---XF1N3" text-anchor="middle" x="330" y="220" fill="#fff">
             <tspan class="primaryNumberWrapper---ITslt">
                <tspan dx="0.05em">{{ maxStr }}</tspan>
             </tspan>
          </text>
          <text class="value---k3Zpr" text-anchor="middle" x="180" y="290" fill="var(--active)">
             <tspan class="primaryNumberWrapper---ITslt">
                <tspan dx="0.05em">{{ value | money }} {{ valueStr }}</tspan>
             </tspan>
          </text>
       </g>
    </svg>
  </div>
</template>

<script>
export default{
  props: ['min', 'minStr', 'max', 'maxStr', 'value', 'valueStr', 'title'],
  data(){
    return{
      deg: 0
    }
  },
  filters: {
    money(num){
      if(num > 0){
        return `${num}`.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1,')
      } else {
        return num
      }
    }
  },
  methods: {
    updateDeg(){
      this.deg = 0
      if(this.value != 0){
        this.deg = 180 / (this.max / this.value)
      }
    }
  },
  mounted(){
    this.updateDeg()
  },
  watch: {
    value: function(newVal, oldVal) {
      this.updateDeg()
    },
    max: function(newVal, oldVal) {
      this.updateDeg()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard{
  &-item{
    background: #454A4E;
    padding: 30px;
    border-radius: 16px;
    @media(max-width:767px){
      margin-bottom: 15px;
    }
    h3{
      color: #fff;
      font-size: 20px;
      margin-bottom: 30px;
    }
  }
  &-panel{
    width: 100%;
    height: auto;
    display: block;
  }
  &-deg{
    transition: transform 1s ease;
  }
}
.value---k3Zpr {
  font-size: 60px;
}
.max---XF1N3, .min---nwu3a {
  font-size: 28px;
}
</style>