<template>
  <div class="popup" :class="{ 'popup-active': anim }">
    <span @click="close" class="popup-back"></span>
    <div class="popup-wrap">
      <button class="popup-close" @click="close">+</button>
      <div class="popup-content">

        <div class="ticket">
          <div class="ticket-left">
            <header class="ticket-header">
              <div class="ticket-logo">
                <img src="@/assets/img/logo.svg" alt="logo" />
              </div>
              <div class="ticket-event--name">San Diego</div>
              <div class="ticket-status" >Ticket Id: 
                <span>{{ ticket.ticketId }} </span>
              </div>
            </header>
          <div class="ticket-main">
            <div class="ticket-name">{{ ticket.user.firstName }} {{ ticket.user.lastName }}</div>
          </div>
          <footer class="ticket-footer">
            <div class="ticket-footer--contact">
              <div class="ticket-email">Email: 
              <span>{{ ticket.user.email }}</span>
            </div>
            <div class="ticket-phone">Phone: 
              <span>{{ticket.user.phone}}</span>
              </div>
            </div>
              <div class="ticket-date">Order Id: 
                <span>{{ ticket.orderId }}</span>
              </div>
          </footer>
          </div>
          <div class="ticket-right">
            <div class="ticket-qr">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/296px-QR_code_for_mobile_English_Wikipedia.svg.png"/>
            </div>
          </div>
        </div>

          <div class="notification">
            <img src="../assets/img/bring.svg" alt="">
            <span>Notification by</span>
            <button>qr</button>
          </div>

          <div class="events">
            <div class="event">
              <div class="event-info">
                <span>21.21.2002</span> 
                <h2>EVENT</h2>
              </div>
              <button>Check-in</button>
            </div>
          </div>

          <div class="notification">
            <img src="../assets/img/clock-quiz.svg" alt="">
            <span>Resend Quiz</span>
            <button>sms</button>
          </div>

        <div class="quiz">
          <div class="quiz-title">
            ticketQuiz
            <button @click="showQuiz" class="btn-quiz"></button>
          </div>
          <div class="quiz-info">
            <div class="quiz-item" v-for="item in quiz">
              <div class="question">{{ item.q }}</div>
              <div class="answer">{{ item.a }}</div>
            </div>
          </div>
        </div>

    </div>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return {
      anim: false,
      quiz: null
    }
  },
  props: ['ticket'],
  methods: {
    close(){
      this.$store.commit('global/setPopup', false)
      document.body.parentNode.style.overflowY = 'auto';
    },
    showQuiz(){
      document.querySelector('.quiz-info').classList.toggle('active')
      document.querySelector('.btn-quiz').classList.toggle('active')
    },
  },
  created(){
    setTimeout(()=>{
      this.anim = true;
    }, 250);
  },
  destroyed(){
    this.anim = false;
  },
  mounted(){
    this.quiz = JSON.parse(this.ticket.quiz)
  }
}
</script>
<style lang="scss" scoped>
.popup{
  position: fixed;
  left: 0; top: 0;
  width: 100%; height: 100vh;
  z-index: 999;
  background: rgba(0,0,0, .8);
  padding: 30px 10px;
  opacity: 0;
  transition: opacity .5s ease;
  overflow: hidden;
  word-wrap: break-word;
  &-active{
    opacity: 1;
    overflow-y: auto;
    .popup-wrap{
      opacity: 1;
      transform: translate(0, 0);
    }
  }
  &-wrap{
    background: var(--prime);
    min-width: 300px;
    max-width: 1000px;
    margin: 0 auto;
    padding: 30px;
    position: relative;
    opacity: 0;
    transform: translate(0, 200px);
    transition: .5s ease .2s;
  }
  &-close{
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    background: none;
    padding: 0;
    color: var(--opposite);
    margin: 0;
    font-size: 40px;
    transform: rotate(45deg);
    height: 50px;
    width: 50px;
    line-height: 1;
    text-align: center;
    &:hover{
      opacity: .8;
    }
  }
  &-back{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    cursor: pointer;
    &:hover{
      background: rgba(255,255,255, .05);
    }
  }
}
.title{
  text-align: left;
  font-weight: 300;
  font-size: 70px;
  line-height: 82px;
  color: var(--opposite);
  margin-bottom: 100px;
  span{
    color: var(--active);
  }
}


.ticket {
  display: flex;
  width: 100%;
  font-size: 12px;
  max-height: 280px;
  max-width: 800px;
  margin: 0 auto 30px;
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
    font-size: 16px;
  }
  @media(min-width:992px){
    font-size: 18px;
  }
  @media(min-width:1200px){
    font-size: 20px;
  }
}
.ticket-left {
  width: 70%;
  background-image: url('../assets/img/ticket-bg.png');
  background-size: cover;
  background-repeat: round;
  padding: 1em 1.5em 1em 1em;
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 10px;
  transition: 1s ease-out;
  @media(min-width:576px){
    padding: 30px;
  }
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
        font-size: 30px;
      }
      @media(min-width:992px){
        font-size: 36px;
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
      padding-top: 1.8em;
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

  .notification{
    display: flex;
    max-width: 800px;
    align-items: center;
    justify-content: flex-end;
    font-weight: 300;
    font-size: 25px;
    line-height: 29px;
    margin: 0 auto 30px;
    color: var(--opposite);
    span{
      margin-right: 20px;
      margin-left: 40px;
    }
    button{
      padding: 10px;
      width: 100px;
      height: 50px;
      border: 3px solid #FFFFFF;
      background: none;
      color: var(--opposite);
      border-radius: 10px;
    }
  }
.events{
  max-width: 800px;
  margin: 0 auto 50px;
  .event{
    display: flex;
    width: 100%;
    max-height: 130px;
    height: 100%;
    &-info{
      flex: 1 70%;
      padding: 40px;
      background: #000;
      border-radius: 20px;
      flex-direction: column;
      color: var(--opposite);
      margin-right: 40px;
      span{
        font-weight: 300;
        font-size: 25px;
        line-height: 1.2;
        color: var(--active);
      }
      h2{
        font-weight: bold;
        font-size: 35px;
        line-height: 1.2;
        color: var(--opposite);
      }
    }
    button{
      flex: 1 30%;
      padding: 20px;
      background: var(--active);
      border: none;
      border-radius: 20px;
      font-weight: bold;
      font-size: 30px;
      line-height: 1.2;
      text-transform: uppercase;
      color: var(--prime);
    }
  }
}
.quiz{
  max-width: 800px;
  padding: 40px;
  margin: 0 auto 50px;
  background: #414141;
  border-radius: 20px;
  &-title{
    opacity: 0.5;
    color: var(--opposite);
    border-bottom: 3px solid var(--prime);
    font-weight: bold;
    font-size: 35px;
    line-height: 1.2;
    margin-bottom: 25px;
    position: relative;

    .btn-quiz{
      position: absolute;
      top: 5px;
      right: 0;
      width: 30px;
      height: 30px;
      border: none;
      background: none;
      transform: rotate(180deg);
      &:before{
        content: url('../assets/img/hide-arrow.svg');
        position: absolute;
        display: inline-block;
        right: 0;
        top: 5px;
      }
      &.active{
        transform: rotate(0deg);
      }
    }
  }
  &-info{
    width: 100%;
    display: none;
    &.active{
      display: block;
    }
    .question{
      flex: 1 50%;
      align-items: flex-start;
      font-size: 16px;
      line-height: 1.2;
      color: #fff;
      padding-right: 15px;
      font-weight: 300;
    }
    .answer{
      flex: 1 50%;
      align-items: center;
      justify-content: flex-start;
      font-weight: 500;
      font-size: 22px;
      color: var(--active);
      border-left: 1px solid #fff;
      padding-left: 15px;
    }
  }
  &-item{
    display: flex;
    padding-bottom: 30px;
    padding-top: 30px;
    border-bottom: 1px solid #fff;
  }
}
</style>