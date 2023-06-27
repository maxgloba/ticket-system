<template>
  <div class="event-orders" v-if="orders">
    <ul class="orders-total">
      <li>GRAND Total:<br> <b>{{ grandTotal.toFixed(2) | format }}</b></li>
      <li>Konnektive Total:<br> <b>{{ (totals.COMPLETE + totals.REFUNDED).toFixed(2) | format }}</b></li>
      <li v-for="item in Object.keys(totals)" v-show="totals[item] > 0">{{ item }} Total:<br> <b>{{ totals[item].toFixed(2) | format }}</b></li>
    </ul>
    <div class="orders-sort orders-bypayment">
      <button class="active" @click.prevent="sortByStatus('all', $event)">All({{ orders.length }})</button>
      <button v-for="status in ordersStat" @click.prevent="sortByStatus(status, $event)" :key="`bystatus_${status}`" v-show="orders.filter(order => order.orderStatus === status).length > 0">{{ status }} ({{ orders.filter(order => order.orderStatus === status).length }})</button>
    </div>
    <div class="orders-sort orders-bypayment">
      <button @click.prevent="sortByPayment('cc', $event)">CreditCard ({{ orders.filter(order => order.paySource === 'CREDITCARD' && order.cardType !== 'TESTCARD').length }})</button>
      <button @click.prevent="sortByPayment('pp', $event)">PayPal ({{ orders.filter(order => order.paySource === 'PAYPAL').length }})</button>
      <button @click.prevent="sortByPayment('tc', $event)">TestCard ({{ orders.filter(order => order.paySource === 'CREDITCARD' && order.cardType === 'TESTCARD').length }})</button>
      <button @click.prevent="sortByPayment('wp', $event)">Without Pay ({{ orders.filter(order => order.paySource === null).length }})</button>
    </div>
    <table class="orders-table">
      <thead>
        <tr>
          <th v-for="item in ordersHead" @click.prevent="tableSort(item.id, $event)" :key="`table_sort_${item.name}`" >
            <span v-if="item.id && item.id !== 'totalAmount'" class="table-sort"></span>
            {{ item.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in ordersSort" :key="`order_${order.orderId}`" @click="goToOrder(order.orderId)">
          <td><b>{{ order.orderId }}</b></td>
          <td>{{ order.dateCreated | setDate }}</td>
          <td>{{ order.lastName }} {{ order.firstName}}</td>
          <td>{{ order.emailAddress }}</td>
          <td>
            {{ order.items }}
            <ul>
              <li v-for="product in order.items" :key="product.name">
                {{ product.name }} <sup>x{{ product.qty }}</sup>
              </li>
            </ul>
          </td>
          <td>{{ order.orderStatus }}</td>
          <td>
            <b v-if="order.totalAmount">{{ order.totalAmount | format }}</b>
            <b v-else>$0.00</b>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data(){
    return{
      grandTotal: 0,
      totals: {
        COMPLETE: 0,
        PARTIAL: 0,
        DECLINED: 0,
        REFUNDED: 0,
        CANCELLED: 0,
        COD_PENDING: 0
      },
      ordersSort: null,
      ordersStat: ['COMPLETE', 'PARTIAL', 'DECLINED', 'REFUNDED', 'CANCELLED', 'COD_PENDING'],
      ordersHead: [
        {
          name: 'Order Id',
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
    orders(){ return this.$store.state.global.orders }
  },
  mounted(){
    this.ordersSort = this.orders
    this.setTotals(this.orders)
  },
  filters: {
    setDate: time => new Date(time).toLocaleString('en', {month: '2-digit', day: '2-digit', year: 'numeric'}),
    format: rangep => `$${rangep}`.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1,')
  },
  methods: {
    setReduce(status){
      const reduceOrders = this.orders
      return reduceOrders.reduce((partialSum, a) => {
        return (a.totalAmount && a.orderStatus === status) ? partialSum + Number(a.totalAmount) : partialSum + 0
      }, 0)
    },
    setTotals(o){
      o.forEach(order => {
        if(order.totalAmount){
          this.totals[order.orderStatus] = Number(this.totals[order.orderStatus]) + Number(order.totalAmount)
        }
        if(order.orderStatus === 'REFUNDED') this.grandTotal = this.grandTotal + Number(order.refundRemaining)
        if(order.orderStatus === 'COMPLETE') this.grandTotal = this.grandTotal + Number(order.totalAmount)
      })
    },
    goToOrder(orderId){
      this.$router.push({path: '/order', query:{id: `${orderId}`} })
    },
    setActive(el){
      document.querySelectorAll('.orders-sort button').forEach(btn => btn.classList.remove('active'))
      el.classList.add('active')
    },
    sortByStatus(status, e){
      this.setActive(e.target)
      this.ordersSort = status === 'all' ? this.orders : this.orders.filter(order => order.orderStatus === status)
    },
    sortByPayment(type, e){
      this.setActive(e.target)
      if(type === 'all') this.ordersSort = this.orders
      if(type === 'cc') this.ordersSort = this.orders.filter(order => order.paySource === 'CREDITCARD' && order.cardType !== 'TESTCARD')
      if(type === 'pp') this.ordersSort = this.orders.filter(order => order.paySource === 'PAYPAL')
      if(type === 'tc') this.ordersSort = this.orders.filter(order => order.paySource === 'CREDITCARD' && order.cardType === 'TESTCARD')
      if(type === 'wp') this.ordersSort = this.orders.filter(order => order.paySource === null)
      // this.setTotal()
    },
    tableSort(key, e){
      if(key && key !== 'totalAmount'){
        const f = this.ordersHead.find(o => o.id === key);
        if(f.sort === 'za' || f.sort === null){
          this.ordersSort = this.orders.map(item => item).sort((a, b) => a[key].toUpperCase() > b[key].toUpperCase() ? 1 : -1 )
          f.sort = 'az'
        } else if(f.sort === 'az'){
          this.ordersSort = this.orders.map(item => item).sort((a, b) => b[key].toUpperCase() > a[key].toUpperCase() ? 1 : -1 )
          f.sort = 'za'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.orders{
  &-total{
    display: flex;
    padding: 0;
    margin: 0 0 15px;
    li{
      font-size: 14px;
      line-height: 25px;
      background: #414141;
      color: var(--opposite);
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