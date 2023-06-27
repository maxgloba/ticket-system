<template>
  <section class="page-event">
    <div class="container">
      <h1 class="title">GeekHub \<span> Subscribers</span></h1>
      <div class="event-subscribers" v-if="subscribers">
        <ul class="subscribers-total">
          <li v-for="item in Object.keys(totals)" v-show="totals[item] > 0">{{ item }} Total: <b>{{ totals[item].toFixed(2) | format }}</b></li>
        </ul>
        <div class="subscribers-sort subscribers-bypayment">
          <button class="active" @click.prevent="sortByStatus('all', $event)">All({{ subscribers.length }})</button>
          <button v-for="status in subscribersStat" @click.prevent="sortByStatus(status, $event)" :key="`bystatus_${status}`" v-show="subscribers.filter(subscriber => subscriber.orderStatus === status).length > 0">{{ status }} ({{ subscribers.filter(subscriber => subscriber.orderStatus === status).length }})</button>
        </div>
        <div class="subscribers-sort subscribers-bypayment">
          <button @click.prevent="sortByPayment('cc', $event)">CreditCard ({{ subscribers.filter(subscriber => subscriber.paySource === 'CREDITCARD' && subscriber.cardType !== 'TESTCARD').length }})</button>
          <button @click.prevent="sortByPayment('pp', $event)">PayPal ({{ subscribers.filter(subscriber => subscriber.paySource === 'PAYPAL').length }})</button>
          <button @click.prevent="sortByPayment('tc', $event)">TestCard ({{ subscribers.filter(subscriber => subscriber.paySource === 'CREDITCARD' && subscriber.cardType === 'TESTCARD').length }})</button>
          <button @click.prevent="sortByPayment('wp', $event)">Without Pay ({{ subscribers.filter(subscriber => subscriber.paySource === null).length }})</button>
        </div>
        <table class="subscribers-table">
          <thead>
            <tr>
              <th v-for="(item, index) in subscribersHead" @click.prevent="tableSort(item.id, $event)" :key="`table_sort_${index}`" >
                <span v-if="item.id" class="table-sort"></span>
                {{ item.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subscriber, index) in subscribersSort" :key="`subscriber_${index}`" @click="editSubscriber(subscriber.orderId, subscriber.emailAddress, subscriber.subscriberId)">
              <td><b>{{ subscriber.orderId }}</b></td>
              <td>{{ subscriber.dateCreated | setDate }}</td>
              <td>{{ subscriber.lastName }} {{ subscriber.firstName}}</td>
              <td>{{ subscriber.emailAddress }}</td>
              <td>
                <ul>
                  <li v-for="product in subscriber.items" :key="product.name">
                    {{ product.name }} <sup>x{{ product.qty }}</sup>
                  </li>
                </ul>
              </td>
              <td>{{ subscriber.orderStatus }}</td>
              <td>
                <b v-if="subscriber.totalAmount">{{ subscriber.totalAmount | format }}</b>
                <b v-else>$0.00</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Transition>
      <SubscribersEdit v-if="changeSubscriber" :orderId="id" :emailAddress="email" />
    </Transition>
  </section>
</template>
<script>
export default {
  data(){
    return{
      id: null,
      email: null,
      changeSubscriber: false,
      totals: {
        COMPLETE: 0,
        PARTIAL: 0,
        DECLINED: 0,
        REFUNDED: 0,
        CANCELLED: 0,
        COD_PENDING: 0
      },
      subscribers: [],
      subscribersSort: [],
      subscribersStat: ['COMPLETE', 'PARTIAL', 'DECLINED', 'REFUNDED', 'CANCELLED', 'COD_PENDING'],
      subscribersHead: [
        {
          name: 'subscriber Id',
          id: false,
          sort: null
        },
        {
          name: 'Date',
          id: 'dateCreated',
          sort: null
        },
        {
          name: 'Customer',
          id: 'lastName',
          sort: null
        },
        {
          name: 'Email',
          id: 'emailAddress',
          sort: null
        },
        {
          name: 'Items',
          id: false,
          sort: null
        },
        {
          name: 'Status',
          id: 'orderStatus',
          sort: null
        },
        {
          name: 'Total $',
          id: 'totalAmount',
          sort: null
        }
      ]
    }
  },
  computed: {
    role(){
      return this.$store.getters['global/getRole']
    }
  },
  filters: {
    setDate: time => new Date(time).toLocaleString('en', {month: '2-digit', day: '2-digit', year: 'numeric'}),
    format: rangep => `$${rangep}`.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1,')
  },
  methods: {
    setReduce(status){
      const reduceSubscribers = this.subscribers
      return reduceSubscribers.reduce((partialSum, a) => {
        return (a.totalAmount && a.orderStatus === status) ? partialSum + Number(a.totalAmount) : partialSum + 0
      }, 0)
    },
    setTotals(o){
      o.forEach(subscriber => {
        if(subscriber.totalAmount){
          this.totals[subscriber.orderStatus] = Number(this.totals[subscriber.orderStatus]) + Number(subscriber.totalAmount)
        }
      })
    },
    editSubscriber(orderId, emailAddress){
      this.id = orderId
      this.email = emailAddress
      this.changeSubscriber = true
    },
    setActive(el){
      document.querySelectorAll('.subscribers-sort button').forEach(btn => btn.classList.remove('active'))
      el.classList.add('active')
    },
    sortByStatus(status, e){
      this.setActive(e.target)
      this.subscribersSort = status === 'all' ? this.subscribers : this.subscribers.filter(subscriber => subscriber.orderStatus === status)
    },
    sortByPayment(type, e){
      this.setActive(e.target)
      if(type === 'all') this.subscribersSort = this.subscribers
      if(type === 'cc') this.subscribersSort = this.subscribers.filter(subscriber => subscriber.paySource === 'CREDITCARD' && subscriber.cardType !== 'TESTCARD')
      if(type === 'pp') this.subscribersSort = this.subscribers.filter(subscriber => subscriber.paySource === 'PAYPAL')
      if(type === 'tc') this.subscribersSort = this.subscribers.filter(subscriber => subscriber.paySource === 'CREDITCARD' && subscriber.cardType === 'TESTCARD')
      if(type === 'wp') this.subscribersSort = this.subscribers.filter(subscriber => subscriber.paySource === null)
      // this.setTotal()
    },
    tableSort(key, e){
      if(key){
        const f = this.subscribersHead.find(o => o.id === key);
        if(f.sort === 'za' || f.sort === null){
          this.subscribersSort.sort((a, b) => (a[key].toUpperCase() > b[key].toUpperCase() ? 1 : -1))
          f.sort = 'az'
        } else if(f.sort === 'az'){
          this.subscribersSort.sort((a, b) => (b[key].toUpperCase() > a[key].toUpperCase() ? 1 : -1))
          f.sort = 'za'
        }
      }
    }
  },
  async fetch(){
    this.$store.commit('global/setLoader', true)
    this.$axios.post(`${process.env.API}/konnektive?endpoint=/order/query`, {
      params: {
        startDate: '01/01/2022',
        endDate: '01/01/2029',
        campaignId: 10,
        resultsPerPage: 200
      }
    })
      .then(res => {
        if(res.data.result === "ERROR"){
          alert(`${res.data.result}! ${res.data.message}`)
        } else {
          this.subscribers.push(...res.data.message.data)
          this.subscribersSort.push(...res.data.message.data)
          const subsCount = Math.ceil((res.data.message.totalResults) / Number(res.data.message.resultsPerPage))
          const promises = []
          for (let i = 2; i <= subsCount; i++) {
            promises.push(
              this.$axios.post(`${process.env.API}/konnektive?endpoint=/order/query`, {
                params: {
                  startDate: '01/01/2022',
                  endDate: '01/01/2029',
                  campaignId: 10,
                  resultsPerPage: 200,
                  page: i
                }
              })
                .then(res => {
                  this.subscribers.push(...res.data.message.data)
                  this.subscribersSort.push(...res.data.message.data)
                })
            )
          }
          Promise.all(promises).then(res => {
            console.log('all promises done');
          })
        }
      })
      .finally(() => {
        this.$store.commit('global/setLoader', false)
      })
  }
}
</script>
<style lang="scss" scoped>
.subscribers{
  &-total{
    display: flex;
    padding: 0;
    margin: 0 0 15px;
    li{
      font-size: 14px;
      line-height: 25px;
      background: #414141;
      color: var(--active);
      border-radius: 4px;
      padding: 5px 15px;
      &:not(:first-child){
        margin-left: 10px;
      }
      b{
        font-size: 20px;
      }
    }
  }
  &-sort{
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
      color: var(--opposite);
      transition: .3s ease;
      &:hover, &.active {
        background: #414141;
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
  &-table{
    border-collapse: collapse;
    width: 100%;
    tr{
      &:nth-child(odd){
        background: #fff;
      }
      &:nth-child(even){
        background: #F1F1F1;
      }
      &:hover {
        background: #ddd; cursor: pointer;
      }
      span{
        font-weight: bold;
      }
      img{
        vertical-align: bottom;
      }
    }
    .items{
      display: flex;
      justify-content: center;
    }
    th, td{
      text-align: left;
      padding: 15px;
      font-size: 14px;
      vertical-align: middle;
      @media(min-width:768px){
        font-size: 15px;
      }
    }
    th {
      border: none;
      color: #fff;
      font-weight: bold;
      background: var(--active);
      position: relative;
      *{
        pointer-events: none;
      }
    }
    td{
      border: none;
      color: #000;
    }
    span{
      cursor: pointer;
    }
    .table-items{
      &:not(:last-child){
        border-bottom: 1px solid var(--active);
      }
    }
    ul{
      li{
        font-size: 12px;
        &:not(:first-child){
          margin-top: 5px;
        }
      }
    }
  }
}
.table-sort{
  position: absolute;
  background: none;
  border: none;
  padding: 0;
  left: 0;
  top: 50%;
  height: 30px;
  width: 15px;
  transform: translateY(-50%);
  &:before, &:after{
    position: absolute;
    width: 100%;
    height: 50%;
    font-family: Verdana, sans-serif;
    line-height: 15px;
    left: 0;
    color: #fff;
    font-size: 12px;
    text-align: center;
  }
  &:before{
    content: "∧";
    top: 0;
  }
  &:after{
    content: "∨";
    bottom: 0;
  }
}
</style>