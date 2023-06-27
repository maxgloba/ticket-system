<template>
  <div class="btn-group">
    <button class="btn btn-export" @click="exportTickets">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM272.1 264.4L224 344l48.99 79.61C279.6 434.3 271.9 448 259.4 448h-26.43c-5.557 0-10.71-2.883-13.63-7.617L192 396l-27.31 44.38C161.8 445.1 156.6 448 151.1 448H124.6c-12.52 0-20.19-13.73-13.63-24.39L160 344L111 264.4C104.4 253.7 112.1 240 124.6 240h26.43c5.557 0 10.71 2.883 13.63 7.613L192 292l27.31-44.39C222.2 242.9 227.4 240 232.9 240h26.43C271.9 240 279.6 253.7 272.1 264.4zM256 0v128h128L256 0z"/></svg>
      Export Tickets
    </button>
    <button class="btn btn-export" @click="exportOrders">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM272.1 264.4L224 344l48.99 79.61C279.6 434.3 271.9 448 259.4 448h-26.43c-5.557 0-10.71-2.883-13.63-7.617L192 396l-27.31 44.38C161.8 445.1 156.6 448 151.1 448H124.6c-12.52 0-20.19-13.73-13.63-24.39L160 344L111 264.4C104.4 253.7 112.1 240 124.6 240h26.43c5.557 0 10.71 2.883 13.63 7.613L192 292l27.31-44.39C222.2 242.9 227.4 240 232.9 240h26.43C271.9 240 279.6 253.7 272.1 264.4zM256 0v128h128L256 0z"/></svg>
      Export Orders
    </button>
  </div>
</template>
<script>
import XLSX from 'xlsx'
export default{
  computed: {
    orders(){return this.$store.getters['global/orders']},
    tickets(){return this.$store.getters['global/tickets']}
  },
  methods: {
    exportTickets(){
      const ticketsObj = []
      this.tickets.forEach(ticket => {
        const date = new Date(Number(ticket.date)).toLocaleString('en', {month: '2-digit', day: '2-digit', year: 'numeric'})
        const ticketObj = {
          'ID': ticket.ticketId,
          'Date': date,
          'Name': `${ticket.user.firstName} ${ticket.user.lastName}`,
          'Email': ticket.user.email,
          'Quiz': (ticket.quiz) ? 'True' : 'False',
          'Phone': (ticket.user.phone) ? ticket.user.phone : ' ',
          'Size': (ticket.size) ? ticket.size : ' '
        }
        ticketsObj.push(ticketObj)
      })
      const ticketsWS = XLSX.utils.json_to_sheet(ticketsObj),
        wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ticketsWS, 'Tickets')
      XLSX.writeFile(wb, 'tickets.xlsx')
    },
    exportOrders(){
      const ordersExport = []
      this.orders.forEach(order => {
        const date = new Date(Number(order.dateCreated)).toLocaleString('en', {month: '2-digit', day: '2-digit', year: 'numeric'})
        const orderObj = {
          'ID': order.orderId,
          'Date': date,
          'Campaign': order.campaignName,
          'Name': `${order.shipFirstName} ${order.shipLastName}`,
          'Email': order.emailAddress,
          'Phone': order.phoneNumber,
          'Status': order.orderStatus,
          'Payment': order.paySource,
          'UTMSource': order.UTMSource,
          'UTMMedium': order.UTMMedium,
          'UTMCampaign': order.UTMCampaign,
          'UTMTerm': order.UTMTerm,
          'UTMContent': order.UTMContent,
          'affId': order.affId,
          'Subtotal': (Number(order.discountPrice) + Number(order.price)).toFixed(2),
          'Discount': order.discountPrice,
          'Total': order.price
        }
        orderObj['Coupon'] = (order.couponCode) ? order.couponCode : ' '
        orderObj['City'] = (order.address1 != 'undefined') ? order.city : ' '
        orderObj['State'] = (order.address1 != 'undefined') ? order.state : ' '
        orderObj['ZIP'] = (order.address1 != 'undefined') ? order.postalCode : ' '
        orderObj['Country'] = (order.address1 != 'undefined') ? order.country : ' '
        orderObj['Billing name'] = (order.address1 != 'undefined') ? `${order.firstName} ${order.lastName}` : ' '

        orderObj['Ticket'] = (order.items && order.items[1]) ? order.items[1].name : ' '
        orderObj['Ticket Qty'] = (order.items && order.items[1]) ? order.items[1].qty : ' '
        orderObj['Ticket Price'] = (order.items && order.items[1]) ? order.items[1].price : ' '

        orderObj['Dinner'] = (order.items && order.items[2]) ? order.items[2].name : ' '
        orderObj['Dinner Qty'] = (order.items && order.items[2]) ? order.items[2].qty : ' '
        orderObj['Dinner Price'] = (order.items && order.items[2]) ? order.items[2].price : ' '

        orderObj['Replay'] = (order.items && order.items[3]) ? order.items[3].name : ' '
        orderObj['Replay Qty'] = (order.items && order.items[3]) ? order.items[3].qty : ' '
        orderObj['Replay Price'] = (order.items && order.items[3]) ? order.items[3].price : ' '

        orderObj['Replay+Notes'] = (order.items && order.items[4]) ? order.items[4].name : ' '
        orderObj['Replay+Notes Qty'] = (order.items && order.items[4]) ? order.items[4].qty : ' '
        orderObj['Replay+Notes Price'] = (order.items && order.items[4]) ? order.items[4].price : ' '

        // orderObj['item_5'] = (order.items && order.items[5]) ? `${order.items[5].name}_${order.items[5].qty}_${order.items[5].price}` : 'false'
        ordersExport.push(orderObj)
      })
      const ordersWS = XLSX.utils.json_to_sheet(ordersExport),
        wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ordersWS, 'Orders')
      XLSX.writeFile(wb, 'orders.xlsx')
    }
  }
}
</script>
<style lang="scss" scoped>
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
    padding: 15px 30px;
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
}
</style>