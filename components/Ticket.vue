<template>
  <div class="ticket" v-if="data" :id="`ticket_${data.orderId}`">
    <div class="ticket-left">
      <header class="ticket-header">
        <div class="ticket-logo">
          <img src="@/assets/img/logo.svg" alt="logo" />
          <span v-if="events">{{ events[data.campaignId] }} Event</span>
        </div>
        <div class="ticket-status ticket-text">
          Ticket Id:
          <nuxt-link :to="`/ticket/?id=${data.ticketId}`">{{ data.ticketId }}</nuxt-link>
        </div>
      </header>
      <div class="ticket-main">
        <div class="ticket-name" v-if="role === 'admin' || role === 'manager' || role === 'client'">
          {{ data.user.firstName }} {{ data.user.lastName }}
          <nuxt-link :to="`/user/?id=${data.userId}`" class="ticket-eddit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
          </nuxt-link>
        </div>
        <div class="ticket-name" v-else>{{ data.user.firstName |saveName }} {{ data.user.lastName |saveName }}</div>
      </div>
      <footer class="ticket-footer">
        <div class="ticket-footer--contact">
          <div class="ticket-size ticket-text" v-if="data.size">
            Size:
            <span >{{ data.size }}</span>
          </div>
          <div class="ticket-email ticket-text">
            Email:
            <span v-if="role === 'admin' || role === 'manager' || role === 'client'">{{ data.user.email }}</span>
            <span v-else>{{data.user.email |saveEmail}}</span>
          </div>
          <div class="ticket-phone ticket-text" v-if="data.user.phone">
            Phone:
              <span>{{ data.user.phone }}</span>
          </div>
          <div class="ticket-date ticket-text">
            Date:
            <span>{{ data.date |setDate }}</span>
          </div>
        </div>
        <div class="ticket-order ticket-text" v-if="role === 'admin' || role === 'manager'">
          Order Id:
          <nuxt-link :to="`/order/?id=${data.orderId}`">{{ data.orderId }}</nuxt-link>
        </div>
        <div class="ticket-order ticket-text" v-if="role === 'client' && $route.name === 'user'">
          <nuxt-link class="btn btn-visit" :to="`/ticket/?id=${data.ticketId}`">Visit Ticket page</nuxt-link>
        </div>
      </footer>
    </div>
    <div class="ticket-qr">
      <img v-if="qrSrc" :src="qrSrc">
      <button class="ticket-remove" title="Remove ticket from this order" @click.prevent="remove(data.ticketId)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      qrSrc: false,
    }
  },
  props: ['data'],
  filters: {
    setDate: time => {
      return new Date(Number(time)).toLocaleString('en', {month: '2-digit', day: '2-digit', year: 'numeric'});
    },
    saveName: name => {
      let codedName = name[0]
      for (let i = 1; i < name.length; i++) {
        codedName += '*'
      }
      return codedName;
    },
    saveEmail: email => {
      return email.replace(/(.{2})(.*)(?=@)/,
        function(gp1, gp2, gp3) {
          for(let i = 0; i < gp3.length; i++) {
            gp2+= "*";
          } return gp2;
        })
    }
  },
  methods: {
    remove(id){
      this.$axios.post(`${process.env.API}/db/updates`, {
        params: {
          table: 'tickets',
          data: {
            index: id,
            keys: ['orderId'],
            values: [' ']
          }
        }
      })
        .then(response => {
          this.$store.commit('global/setAlert', 'Ticket was removed from this order!')
          this.$el.style.display = 'none'
        })
    },
    getQR(ticketId){
      this.$axios.get(`${process.env.API}/qr?ticketId=${ticketId}`)
        .then(response => {
          this.qrSrc = response.data
        })
    }
  },
  computed: {
    role(){return this.$store.getters['global/getRole']},
    events(){return this.$store.getters['global/getEvents']}
  },
  mounted(){
    this.getQR(this.data.ticketId)
  }
}
</script>
<style lang="scss" scoped>
.ticket {
  font-size: 14px;
  margin: 0 auto 60px;
  @media(min-width:768px){
    display: flex;
    max-height: 306px;
  }
  @media(min-width:1200px){
    max-height: 365px;
  }
  &-left {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: #fff;
    padding: 15px;
    background: linear-gradient(45deg, var(--prime), #414141);
    border-radius: 8px 8px 0 0;
    margin-bottom: 8px;
    @media(min-width:768px){
      padding: 30px;
      margin-bottom: 0;
      margin-right: 8px;
      flex: 1 calc(100% - 306px);
      max-width: calc(100% - 306px);
      border-radius: 16px 0 0 16px;
    }
    &:before{
      content:"";
      background: url('@/assets/img/sep-dark.png') repeat-x 0 0;
      position: absolute;
      right: 0; top: 100%;
      width: 100%; height: 6px;
      @media(min-width:768px){
        right: -6px; top: 0;
        width: 6px; height: 100%;
        background: url('@/assets/img/sep-dark_desc.png') repeat-y 0 0;
      }
    }
  }
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-logo {
    width: 77px;
    position: relative;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
    span{
      display: block;
      position: absolute;
      bottom: -40px;
      transform: translate(10px, 0);
      font-size: 30px;
      white-space: nowrap;
      color: rgba(#fff, .1);
      line-height: 1;
      @media(min-width:576px){
        left: 100%;
        bottom: -5px;
      }
      @media(min-width:992px){
        font-size: 40px;
      }
    }
  }
  &-main {
    text-align: left;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
  &-name {
    position: relative;
    font-weight: bold;
    font-size: 30px;
    line-height: 1;
    padding-right: 30px;
    @media(max-width:767px){
      padding: 60px 0;
      padding-right: 30px;
    }
    @media(min-width:992px){
      font-size: 50px;
    }
    &:hover{
      .ticket-eddit{
        opacity: 1;
      }
    }
  }
  &-footer {
    padding-bottom: 15px;
    @media(min-width:768px){
      padding-bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
  }
  &-order {
    padding-top: 1.8em;
    @media(max-width:767px){
      padding-top: 0.2em;
    }
  }
  &-qr {
    width: 100%;
    position: relative;
    padding-top: 6px;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
    flex: 1 200px;
    min-width: 200px;
    @media(min-width:768px){
      border-radius: 0 16px 16px 0;
      padding-top: 0;
      padding-left: 6px;
      flex: 1 306px;
      height: 306px;
      min-width: 306px;
    }
    @media(min-width:1200px){
      flex: 1 365px;
      height: 365px;
    }
    &:before{
      content:"";
      background: url('@/assets/img/sep-white.png') repeat-x 0 0;
      position: absolute;
      left: 0; top: 0;
      width: 100%; height: 6px;
      @media(min-width:768px){
        width: 6px; height: 100%;
        background: url('@/assets/img/sep-white_desc.png') repeat-y 0 0;
      }
    }
    img {
      width: 100%;
      display: block;
      @media(min-width:768px){
        height: 306px;
      }
      @media(min-width:1200px){
        height: 365px;
      }
    }
    &:hover{
      .ticket-remove{
        opacity: 1;
      }
    }
  }
  &-status{
    @media(min-width:768px){
      margin-top: -25px;
    }
    @media(min-width:992px){
      margin-top: 0;
    }
  }
  &-text{
    line-height: 1.1;
    font-size: 14px;
    font-weight: 300;
    text-transform: uppercase;
    @media(min-width:768px){
      font-size: 16px;
      line-height: 1.4;
    }
    span, a{
      text-decoration: none;
      font-size: 20px;
      font-weight: 700;
      color: var(--active);
      text-transform: none;
      @media(min-width:768px){
        font-size: 20px;
      }
    }
    &:not(&.ticket-status){
      @media(max-width:767px){
        span{
          display: block;
        }
        &:not(:first-child){
          margin-top: 15px;
        }
      }
    }
    .btn-visit{
      background: var(--active);
      color: #fff;
      text-transform: uppercase;
      font-size: 14px;
      padding: 10px 20px;
      border-radius: 4px;
      transition: background .3s ease;
      &:hover{
        background: #1E2022;
      }
    }
  }
  &-eddit, &-remove{
    background: var(--active);
    border: none;
    height: 24px;
    width: 24px;
    font-size: 12px;
    border-radius: 4px;
    text-transform: uppercase;
    position: absolute;
    z-index: 10;
    right: 10px;
    top: 10px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 1s ease;
    &:hover{
      background: #ff0000;
    }
    svg{
      display: block;
      height: 12px;
      width: auto;
      path{
        fill: #fff;
      }
    }
  }
  &-eddit {
    right: 0;
    top: 2px;
  }
}
</style>