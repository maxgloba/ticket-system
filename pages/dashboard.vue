<template>
  <section class="page page-dashboard">
    <div class="container">
      <div class="dashboard-menu">
        <button
          v-for="event in Object.keys(events).slice().reverse()"
          :key="`event_${event}`"
          :class="event == activeEvent ? 'active':''"
          @click="getData(event)">
          {{ events[event] }}
        </button>
      </div>
      <div class="dashboard-list">
        <DashboardItem
          title="ATTENDEES"
          :min="0"
          minStr="0"
          :max="150"
          maxStr="150"
          :value="tickets.length"
          valueStr="" />
        <DashboardItem
          title="REVENUE"
          :min="0"
          minStr="0$"
          :max="100000"
          maxStr="100K $"
          :value="revenue"
          valueStr="$" />
        <DashboardItem
          title="QUESTIONNAIRES"
          :min="0"
          minStr="0"
          :max="tickets.length"
          :maxStr="tickets.length"
          :value="ticketsQuiz"
          valueStr="" />
        <DashboardItem
          title="TOTAL DISCOUNT"
          :min="0"
          minStr="0$"
          :max="200000"
          maxStr="200K $"
          :value="totalDiscount"
          valueStr="$" />
        <div class="dashboard-table">
          <h3>CODES USED</h3>
          <table>
            <thead>
              <tr>
                <th>CODE USED</th>
                <th>COUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="code in Object.keys(coupons)">
                <td>{{ code }}</td>
                <td>{{ coupons[code] }}</td>
              </tr>
              <tr>
                <td>Grand Total</td>
                <td>{{ Object.keys(coupons).reduce((partialSum, code) => partialSum + coupons[code], 0) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  data(){
    return{
      activeEvent: 11,
      tickets: [],
      coupons: {},
      revenue: 0,
      ticketsQuiz: 0,
      totalDiscount: 0,
    }
  },
  computed: {
    events(){return this.$store.getters['global/geteventsDashboard']}
  },
  methods: {
    getData(id){
      this.$store.commit('global/setLoader', true)
      this.activeEvent = id
      const api = 'https//api.geekex.com'
      this.tickets = []
      this.coupons = {}
      this.revenue = 0
      this.ticketsQuiz = 0
      this.totalDiscount = 0
      this.$axios.post('https://api.geekex.com/konnektive?endpoint=/order/query', {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          startDate: '01/01/2022',
          endDate: '01/01/2024',
          campaignId: id,
          orderStatus: 'COMPLETE',
          resultsPerPage: 200,
        }
      })
        .then(res => {
          this.$store.commit('global/setLoader', false)
          const orders = res.data.message.data
          if(orders && orders.length > 0){
            orders.forEach(order => {
              this.coupons[order.couponCode] = this.coupons[order.couponCode] ? this.coupons[order.couponCode] + 1 : 1
              this.revenue = this.revenue + Number(order.totalAmount)
              this.totalDiscount = this.totalDiscount + Number(order.totalDiscount)
              this.$axios.get(`https://api.geekex.com/db/tickets?where=orderId&value=${order.orderId}`, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then(tickets => {
                  this.tickets.push(...tickets.data)
                  tickets.data.forEach(ticket => {
                    if(ticket.quiz) this.ticketsQuiz = this.ticketsQuiz + 1
                  })
                })
            })
          } else {
            alert(`Konnektive didn't send us the data`)
          }
        })
    }
  },
  mounted(){
    if(this.$route.query.id){
      this.getData(this.$route.query.id)
    } else {
      this.getData(this.activeEvent)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard{
  &-menu{
    margin-bottom: 10px;
    button{
      border: none;
      padding: 5px 15px;
      background: var(--active);
      border-radius: 4px;
      font-weight: 400;
      font-size: 14px;
      line-height: 1;
      text-align: center;
      text-transform: uppercase;
      text-decoration: none;
      color: #000;
      transition: .3s ease;
      @media(max-width:767px){
        margin-bottom: 10px;
      }
      &:hover, &.active {
        background: #414141;
        color: #fff;
      }
      &.active {
        cursor: default;
        pointer-events: none;
      }
      &:not(:first-child){
        margin-left: 10px;
      }
    }
  }
  &-list{
    padding-bottom: 30px;
    @media(min-width:768px){
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-column-gap: 15px;
      grid-row-gap: 15px;
      & > div{
        &:nth-child(1){ grid-area: 1 / 1 / 2 / 2; }
        &:nth-child(2){ grid-area: 1 / 2 / 2 / 3; }
        &:nth-child(3){ grid-area: 2 / 1 / 3 / 2; }
        &:nth-child(4){ grid-area: 2 / 2 / 3 / 3; }
        &:nth-child(5){ grid-area: 1 / 3 / 3 / 5; }
      }
    }
  }
  &-table{
    background: #454A4E;
    padding: 30px;
    border-radius: 16px;
    h3{
      color: #fff;
      font-size: 20px;
      margin-bottom: 30px;
    }
    table{
      width: 100%;
      color: #fff;
      td{
        text-align: left;
        border-bottom: 1px solid #fff;
        padding-bottom: 10px;
        padding-top: 10px;
        & + td{
          text-align: right;
        }
      }
      th{
        text-align: left;
        font-size: 14px;
        font-weight: 300;
        border-bottom: 1px solid #fff;
        padding-bottom: 15px;
        & + th{
          text-align: right;
        }
      }
      tr{
        &:last-child{
          td{
            border-bottom: none;
            padding-top: 20px;
          }
        }
      }
    }
  }
}
</style>