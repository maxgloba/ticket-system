<template>
  <section class="page page-order">
    <div class="container">
      <h1 class="title">Order information:</h1>
      <div class="order" v-if="order">
        <div class="order-title">
          <div class="order-id">Order #: <b>{{ order.orderId }}</b></div>
          <div class="ordr-date">{{ order.dateCreated }}</div>
        </div>
        <div class="order-row">
          <div class="order-left">
            <div class="order-info">
              <h4>Order Information:</h4>
              <ul>
                <li>name: <b>{{ order.shipFirstName }} {{ order.shipLastName }}</b></li>
                <li>status: <b>{{ order.orderStatus }}</b></li>
                <li>payment: <b>{{ order.paySource }}</b></li>
              </ul>
            </div>
            <div class="order-billing" v-if="order.address1 != 'undefined'">
              <h4>Billing Address:</h4>
              <ul>
                <li><b>{{ order.firstName }} {{ order.lastName }}</b></li>
                <li>{{ order.address1 }}</li>
                <li>{{ order.city }}, {{ order.state }}, {{ order.postalCode }}, {{ order.country }}</li>
              </ul>
            </div>
            <div class="order-contact">
              <h4>Contact Info:</h4>
              <ul>
                <li>email: <b>{{ order.emailAddress }}</b></li>
                <li>phone: <b>{{ order.phoneNumber }}</b></li>
              </ul>
            </div>
          </div>
          <div class="order-right">
            <div class="order-summary">
              <table>
                <thead>
                  <tr>
                    <td class="sm">id</td>
                    <td>name</td>
                    <td class="sm">qty</td>
                    <td class="md">price</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.items">
                    <th>{{ item.productId }}</th>
                    <th>{{ item.name }}</th>
                    <th>{{ item.qty }}</th>
                    <th>{{ item.price }}</th>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3">
                      Coupon Code:
                      <b v-if="order.couponCode">{{ order.couponCode }}</b>
                      <b v-else>---</b>
                    </td>
                    <td>
                      <ul>
                        <li><span>Subtotal:</span> <b>${{ (Number(order.discountPrice) + Number(order.price)).toFixed(2) }}</b></li>
                        <li><span>Discount:</span> <b>-${{ order.discountPrice }}</b></li>
                        <li class="total"><span>Total:</span> <b>${{ order.price }}</b></li>
                        <li class="total" v-if="order.refundRemaining && Number(order.refundRemaining) > 0"><span>Remaining:</span> <b>{{ order.refundRemaining }}</b></li>
                      </ul>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      <h2 class="title">Order Tickets:</h2>
      <Ticket v-for="(ticket, i) in tickets" :data="ticket" :key="ticket.orderId+'_'+i" />
      <button @click.prevent="addTicket" class="btn btn-visit">Add Ticket</button>

    </div>
  </section>
</template>
<script>
export default {
  data(){
    return {
      order: false,
      tickets: [],
    }
  },
  computed: {
    role() {
      return this.$store.getters['global/getRole']
    },
  },
  methods: {
    addTicket(){
      this.$router.push({
        path: '/ticket/add',
        query: {
          orderId: this.order.orderId,
          campaignId: this.order.campaignId,
          firstName: this.order.firstName,
          lastName: this.order.lastName,
          emailAddress: this.order.emailAddress,
          phoneNumber: this.order.phoneNumber,
        }
      })
    },
    getOrder(orderId){
      this.$axios.post(`${process.env.API}/konnektive?endpoint=/order/query`, {
        params: {orderId: orderId}
      })
        .then(response => {
          this.$store.commit('global/setLoader', false)
          if(response.data.result === 'SUCCESS') {
            this.order = response.data.message.data[0]
            if(this.order.orderStatus === "REFUNDED" && Number(this.order.refundRemaining) > 0){
              this.order.orderStatus = 'PARTIALLY REFUNDED'
            }
          }
        })
    },
    getTickets(orderId){
      this.$axios.get(`${process.env.API}/db/tickets?where=orderId&value=${orderId}`)
        .then(response => {
          if(response.data.length > 0){
            response.data.forEach((ticket, index) => {
              this.$axios.get(`${process.env.API}/db/users?where=ID&value=${ticket.userId}`)
                .then(user => {
                  this.tickets.push({
                    orderId: ticket.orderId,
                    ticketId: ticket.ID,
                    userId: ticket.userId,
                    date: ticket.created.toString(),
                    size: ticket.size,
                    qr: null,
                    campaignId: ticket.campaignId,
                    user: {
                      firstName: user.data[0].firstName,
                      lastName: user.data[0].lastName,
                      email: user.data[0].email,
                      phone: user.data[0].phone,
                      image: user.data[0].image
                    }
                  })
                  this.$axios.get(`${process.env.API}/qr?ticketId=${ticket.ID}`)
                    .then(qr => {
                      this.tickets[index].qr = qr
                    })
                })
            })
          } else {
            this.$store.commit('global/setAlert', `This order doesn't have any tickets.`)
          }
        })
    }
  },
  mounted(){
    this.$store.commit('global/setLoader', true)
    if(this.$route.query.id){
      this.getOrder(this.$route.query.id)
      this.getTickets(this.$route.query.id)
    } else {
      window.history.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.page-order{
  padding-bottom: 60px;
}
.order{
  background: none;
  border-radius: 8px;
  padding: 10px 0;
  color: #fff;
  font-weight: 300;
  line-height: 1.3;
  font-size: 14px;
  margin-bottom: 60px;
  @media(min-width:1200px){
    font-size: 16px;
  }
  @media(min-width:768px){
    padding: 20px 0;
  }
  h3{
    color: rgba(#fff, .5);
    font-size: 30px;
    margin: 0 0 10px;
    text-align: center;
    font-weight: 700;
  }
  h4{
    color: #fff;
    font-size: 20px;
    margin: 0 0 5px;
  }
  ul{
    margin: 0;
    padding: 0;
  }
  li{
    font-size: 14px;
    padding: 2px 0;
  }
  b{
    font-size: 16px;
    color: var(--active);
  }
  &-title{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #fff;
    padding-bottom: 15px;
    margin-bottom: 30px;
  }
  &-row{
    display: flex;
    flex-wrap: wrap;
    & > div{
      flex: 1 100%;
      @media(min-width:768px){
        flex: 1 50%;
      }
      @media(min-width:992px){
        flex: 1 33.333%;
      }
    }
    .order-left{
      flex: 1 100%;
      @media(min-width:992px){
        flex: 1 40%;
      }
    }
    .order-right{
      flex: 1 100%;
      max-width: 100%;
      @media(min-width:992px){
        flex: 1 60%;
      }
    }
  }
  &-summary{
    width: 100%;
    overflow-x: auto;
    padding-top: 60px;
    @media(min-width:992px){
      padding-top: 0;
    }
  }
  &-info{
    margin-bottom: 30px;
  }
  &-billing{
    margin-bottom: 30px;
  }
  table{
    width: 100%;
    border-collapse: collapse;
    min-width: 500px;
    td, th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: rgba(255,255,255, .2);
      color: white;
    }
    thead, tbody{
      th, td{
        text-align: center;
      }
    }
    ul{
      padding: 10px;
      width: 100%;
    }
    li{
      padding: 4px 0;
      display: flex;
      justify-content: space-between;
      &.total{
        font-size: 20px;
        line-height: 30px;
        font-weight: 700;
      }
    }
    .sm{
      width: 40px;
    }
    .md{
      width: 200px;
      &-ship{
        width: 100px;
        @media(min-width:992px){
          width: 200px;
        }
      }
    }
  }
}

</style>
