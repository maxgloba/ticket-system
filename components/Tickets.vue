<template>
  <section class="section-tickets">
    <div class="container">
      <div class="info">
        <form @submit="showTickets">
          <div class="field">
            <input type="search" @submit="sortTickets('orderId')" placeholder="Username search" value="orderId">
          </div>
          <div class="submit">
            <input type="submit" value="Open User tickets list">
          </div>
        </form>
      </div>
      <div class="ticket" v-if="tickets.length > 0" v-for="ticket in tickets">
        <div class="ticket-left" v-for="user in users">
          <header class="ticket-header">
            <div class="ticket-logo">
              <img src="@/assets/img/logo.svg" alt="logo" />
            </div>
            <div class="ticket-event--name">Los Angeles</div>
            <div class="ticket-status">Status: 
              <span>VIP</span>
            </div>
          </header>
          <div class="ticket-main">
            <div class="ticket-name">{{ user.firstName }} {{ user.lastName }}</div>
          </div>
          <footer class="ticket-footer">
            <div class="ticket-footer--contact">
              <div class="ticket-email">Email: 
                <span>{{ user.email }}</span>
              </div>
              <div class="ticket-phone">Phone: 
                <span>+1234567890</span>
              </div>
            </div>
            <div class="ticket-date">Date: 
              <span>11.11.2021</span>
            </div>
          </footer>
        </div>
        <div class="ticket-right">
          <div class="ticket-qr">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/296px-QR_code_for_mobile_English_Wikipedia.svg.png"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data(){
    return {
      tickets: [],
      users: [],
    }
  },
  methods: {
    getTicket(orderId){
      this.tickets = []
      this.users = []
      this.$axios.get(`${process.env.API}/db/tickets?where=orderId&value=${orderId}`)
        .then(response => {
          this.tickets = response.data
          response.data.forEach(ticket => {
            this.$axios.get(`${process.env.API}/db/users?where=ID&value=${ticket.userId}`)
              .then(user => {
                user.data.forEach(user => {
                  this.users.push(user)
                })
              })
          })
        })
      
    },
    sortTickets(orderId){
      this.tickets = []
      this.getTicket(orderId)
      this.tickets.forEach( ticket => {
        if(ticket.orderId === orderId){
          this.tickets.push(ticket)
        }
      })
    },
    showTickets(userId){
      this.users = []
      this.users.forEach( user => {
        if(user.userID === userId){
          this.users.push(user)
        }
      })
      console.dir(this.tickets)
    },
  }
}
</script>
<style lang="scss" scoped>
.section-tickets{
  margin-bottom: 50px;
}
.info{
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  width: 100%;
  form{
    display: flex;
    width: 100%;
    .field{
      flex: 1 80%;
    }
    input{
      border: none;
      height: 61px;
      &[type="search"]{
        background: var(--prime) url('../assets/img/icon-search.png') no-repeat center center;
        padding: 0;
        font-size: 13px;
        background: var(--prime);
        color: var(--opposite);
        width: 100%;
        @media(min-width:376px){
          font-size: 15px;
        }
        @media(min-width:576px){
          font-size: 16px;
        }
      }
    }
  }
  .submit{
    width: 70px;
    flex: 2 30%;
    height: 60px;
    font-weight: bold;
    font-size: 12px;
    line-height: 21px;
    // border: 1px solid var(--opposite);
    color: var(--opposite);
    background: none;
    @media(min-width:376px){
      font-size: 14px;
    }
    @media(min-width:576px){
      font-size: 15px;
    }
    @media(min-width:768px){
      font-size: 17px;
    }
    // &:hover{
    //   border: 3px solid var(--active);
    // }
    img{
      margin-left: 15px;
    }
  }
}
.ticket {
  display: flex;
  width: 100%;
  font-size: 12px;
  max-height: 365px;
  cursor: pointer;
  &:hover{
    .ticket-left{
      transform: translateX(-10px);
      transition: 1s ease-out;
    }
  }
  @media(min-width:576px){
    font-size: 14px;
  }
  @media(min-width:768px){
    font-size: 18px;
  }
  @media(min-width:992px){
    font-size: 24px;
  }
  @media(min-width:1200px){
    font-size: 26px;
  }
}
.ticket-left {
  width: 70%;
  // background: linear-gradient(180deg, #4e4e4e 0%, #070707 100%);
  background-image: url('../assets/img/ticket-bg.png');
  background-size: cover;
  background-repeat: round;
  // position: relative;
  padding: 1em 1.5em 1em 1em;
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 10px;
  transition: 1s ease-out;
  // &:hover{
  //   transform: translateX(-10px);
  //   transition: 1s ease-out;
  // }
  @media(min-width:576px){
    padding: 30px;
  }
  // &:before {
  //   content: '';
  //   width: 7px;
  //   height: 100%;
  //   position: absolute;
  //   right: 0;
  //   top: 0;
  //   background: linear-gradient(180deg, #4e4e4e 0%, #070707 100%);
  //   background-image: radial-gradient(circle, #000 4px, #070707 4px, #353333 5px);
  //   background-size: 14px 14px;
  //   background-position: 0 0;
  // }
  .ticket-header {
    display: flex;
    align-items: center;
    padding-bottom: 1em;
    justify-content: space-between;
    @media(max-width:375px){
      flex-direction: column;
      align-items: center;
    }
    .ticket-logo {
      min-width: 77px;
      width: 77px;
      display: flex;
      transform: scale(.6);
      @media(min-width:576px){
        transform: scale(1);
        margin-right: 40px;
      }
      @media(min-width:768px){
        margin-right: 0;
      }
      img {
        width: 100%;
        height: auto;
      }
    }
    .ticket-event--name{
      padding-bottom: 10;
      @media(min-width:376px){
        padding-bottom: 0;
      }
      @media(min-width:576px){
        margin-right: 40px;
      }
      @media(min-width:768px){
        margin-right: 0;
      }
    }
    .ticket-status {
      span {
        font-weight: bold;
        color: #fff;
      }
    }
  }
  .ticket-main {
    text-align: left;
    flex-grow: 1;
    display: flex;
    align-items: center;
    .ticket-name {
      font-weight: bold;
      font-size: 24px;
      line-height: 1.2;
      @media(min-width:576px){
        font-size: 38px;
      }
      @media(min-width:992px){
        font-size: 48px;
        line-height: 56px;
      }
    }
  }
  .ticket-footer {
    display: flex;
    justify-content: space-between;
    @media(max-width:767px){
      flex-direction: column;
    }
    .ticket-email {
      font-weight: 300;
      line-height: 1.2;
      padding-top: 1.8em;
    }
    .ticket-phone {
      font-weight: 300;
      line-height: 1.4;
    }
    .ticket-date {
      padding-top: 2.8em;
      @media(max-width:767px){
        padding-top: 0.2em;
      }
    }
  }
}
    
.ticket-right {
  background-image: url('../assets/img/qr-background.png');
  background-repeat: round;
  transition: 1s ease-out;
  width: 30%;
  margin: 0;
  padding: .6em;
  transition: 1s ease-out;
  @media(min-width:576px){
    padding: 1.6em;
  }
  // &:before {
  //   content: "";
  //   width: 7px;
  //   height: 100%;
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   background-image: radial-gradient( #000 4px, #070707 4px, #fff 5px);
  //   background-size: 14px 14px;
  //   background-position: -8px 0;
  // }
  .ticket-qr {
    margin: 0;
    display: flex;
    align-items: center;
    height: 100%;
    img {
      width: 100%;
    }
  }
}

</style>
