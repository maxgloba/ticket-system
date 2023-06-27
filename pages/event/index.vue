<template>
  <section class="page-event">
    <div class="container">
      <EventBanner v-if="campaignId" :campaignId="campaignId" />
      <EventSlider v-if="campaignId" :campaignId="campaignId" />
      <div v-if="['admin', 'manager'].includes(role)">
        <ul class="tabs-nav">
          <li v-for="item in tabsList" :key="item.id" @click="openTab(item.id, $event)" :class="(item.id==='tab1' ? 'active' : '' )">{{ item.name }}</li>
        </ul>
        <EventTickets v-if="orders && activeTab === 'tab1'" />
        <EventOrders v-if="orders && activeTab === 'tab2'" />
        <!-- <EventLivestream v-if="orders && activeTab === 'tab3'" /> -->
        <EventExport v-if="orders && activeTab === 'tab4'" />
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data(){
    return{
      campaignId: null,
      activeTab: 'tab1',
      tabsList: [
        {
          id: 'tab1',
          name: 'Tickets'
        },
        {
          id: 'tab2',
          name: 'Orders'
        },
        // {
        //   id: 'tab3',
        //   name: 'Livestream'
        // },
        {
          id: 'tab4',
          name: 'Export to Excel'
        }
      ]
    }
  },
  computed: {
    orders(){return this.$store.getters['global/orders']},
    role(){return this.$store.getters['global/getRole']}
  },
  methods: {
    openTab(tab, e) {
      this.activeTab = tab
      const items = document.querySelectorAll(".tabs-nav li")
      items.forEach(item => item.classList.remove('active'))
      e.target.classList.add('active')
    }
  },
  mounted(){
    if(this.$route.query.id){
      this.campaignId = this.$route.query.id
      this.$store.dispatch('global/getOrders', this.$route.query.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs-nav{
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  li{
    width: calc(100% / 3 - 15px);
    color: #fff;
    text-align: center;
    padding: 15px 0;
    font-size: 24px;
    border-radius: 8px;
    margin: 0;
    background: #414141;
    transition: .5s ease;
    cursor: pointer;
    &.active{
      background: var(--active);
      cursor: default;
    }
  }
}
.page-event{
  padding-bottom: 60px;
}
</style>