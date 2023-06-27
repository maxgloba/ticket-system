<template>
  <div v-if="tickets" class="event-tickets">
    <div class="tickets-sort tickets-bypayment">
      <button class="active" @click.prevent="sortByQuiz('all', $event)">All({{ tickets.length }})</button>
      <button @click.prevent="sortByQuiz('with', $event)">With quiz ({{ this.tickets.filter(ticket => ticket.quiz).length }})</button>
      <button @click.prevent="sortByQuiz('without', $event)">Without quiz ({{ this.tickets.filter(ticket => !ticket.quiz).length }})</button>
    </div>
    <table class="tickets-table">
      <thead>
        <tr>
          <th v-for="item in ticketsHead" @click.prevent="tableSort(item.id, $event)" :key="`table_tickets_sort_${item.name}`">
            <span class="table-sort" v-if="item.id"></span>
            {{ item.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ticket, index) in ticketsData" :key="'ticketId_'+ticket.ticketId+'_'+index" @click="goToTicket(ticket.ticketId)">
          <td><span>{{ ticket.ticketId }}</span></td>
          <td>{{ ticket.date | setDate}}</td>
          <td v-html="ticket.user ? `${ticket.user.lastName } ${ ticket.user.firstName }` : ''"></td>
          <td v-html="ticket.user ? `${ticket.user.email }` : ''"></td>
          <td><span>{{ ticket.quiz ? 'True' : 'False' }}</span></td>
        </tr>
      </tbody>
    </table>
    <div>
      <div v-for="(ticket, index) in ticketsData">
        {{ ticket.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      ticketsData: null,
      ticketsHead: [
        {
          name: 'Ticket Id',
          id: false,
          sort: null
        },
        {
          name: 'Date',
          id: 'date',
          sort: null
        },
        {
          name: 'Customer',
          id: 'lastName',
          sort: null
        },
        {
          name: 'Email',
          id: 'email',
          sort: null
        },
        {
          name: 'Quiz Status',
          id: false,
          sort: null
        }
      ]
    }
  },
  filters: {
    setDate: time => {
      return new Date(Number(time)).toLocaleString('en', {month: '2-digit', day: '2-digit', year: 'numeric'});
    }
  },
  computed: {
    tickets(){ return this.$store.state.global.tickets }
  },
  mounted(){
    this.ticketsData = this.tickets
  },
  methods: {
    goToTicket(ticketId){
      this.$router.push({path: '/ticket', query:{id: `${ticketId}`} })
    },
    setActive(el){
      document.querySelectorAll('.tickets-sort button').forEach(btn => btn.classList.remove('active'))
      el.classList.add('active')
    },
    sortByQuiz(status, e){
      this.setActive(e.target)
      if(status === 'all') this.ticketsData = this.tickets
      if(status === 'with') this.ticketsData = this.tickets.filter(ticket => ticket.quiz)
      if(status === 'without') this.ticketsData = this.tickets.filter(ticket => !ticket.quiz)
    },
    tableSort(key, e){
      if(key){
        const f = this.ticketsHead.find(o => o.id === key);
        if(f.sort === 'za' || f.sort === null){
          this.ticketsData = this.tickets.map(item => item).sort((a, b) => {
            if(['lastName', 'email'].includes(key)){
              return a.user[key].toUpperCase() > b.user[key].toUpperCase() ? 1 : -1
            } else {
              return a[key].toUpperCase() > b[key].toUpperCase() ? 1 : -1
            }
          })
          f.sort = 'az'
        } else if(f.sort === 'az'){
          this.ticketsData = this.tickets.map(item => item).sort((a, b) => {
            if(['lastName', 'email'].includes(key)){
              return b.user[key].toUpperCase() > a.user[key].toUpperCase() ? 1 : -1
            } else {
              return b[key].toUpperCase() > a[key].toUpperCase() ? 1 : -1
            }
          })
          f.sort = 'za'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tickets{
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
      &:first-child{width: 100px}
      &:nth-child(2){width: 120px}
      &:last-child{width: 115px}
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