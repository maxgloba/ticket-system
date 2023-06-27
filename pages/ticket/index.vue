<template>
  <section class="page page-ticket" v-if="ticket">
    <div class="container">
      <h1 class="title">
        e-Ticket \ <span>{{ eventInfo.title }}</span>
      </h1>
      <Ticket :data="ticket" />
      <h4 v-if="role === 'admin' || role === 'manager'">
        Your quiz answers: <b v-html="ticket.quiz ? 'True' : 'False'"></b>
      </h4>
      <div class="resend" v-if="role === 'admin' || role === 'manager'">
        <h3>Resend Email:</h3>
        <div class="resend-btns">
          <button @click="sendWelcomeEmail">Welcome Email</button>
          <button @click="sendConfirmEmail">Confirm Email</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      ticket: false,
      qrSrc: false,
      campaignData: null,
      campaignId: null,
    };
  },
  computed: {
    role(){return this.$store.getters['global/getRole']},
    eventInfo(){
      const eventsList = this.$store.getters['global/eventsList']
      let eventInfo
      Object.keys(eventsList).forEach(year => {
        if(eventsList[year].find(event => event.campignId == this.campaignId)){
          eventInfo = eventsList[year].find(event => event.campignId == this.campaignId)
        }
      })
      return eventInfo
    },
  },
  methods: {
    showQuiz(){
      this.quiz = !this.quiz
    },
    sendWelcomeEmail(){
      this.$store.commit('global/setLoader', true);
      this.$axios.post(`${process.env.API}/nodemailer/welcome`, {
        params: {
          ticketId: this.ticket.ticketId,
          email: this.ticket.user.email,
          name: `${this.ticket.user.firstName} ${this.ticket.user.lastName}`,
          id: this.campaignId
        }
      })
        .then(res => {
          this.$store.commit('global/setAlert', 'Email was sent')
        })
        .catch(err => {
          console.dir(err)
        })
        .finally(() => {
          this.$store.commit('global/setLoader', false);
        })
    },
    sendConfirmEmail() {
      this.$store.commit('global/setLoader', true);
      this.$axios.post(`${process.env.API}/nodemailer/confirm`, {
        params: {
          ticketId: this.ticket.ticketId,
          email: this.ticket.user.email,
          name: `${this.ticket.user.firstName} ${this.ticket.user.lastName}`,
          id: this.campaignId
        }
      })
        .then(res => {
          console.dir(res)
          return this.$axios.post(`${process.env.API}/db/updates`, {
            params: {
              table: 'tickets',
              data: {
                index: this.ticket.ticketId,
                keys: ["quiz"],
                values: ["true"],
              }
            }
          })
        })
        .then(res => {
          this.$store.commit('global/setAlert', 'Email was sent')
        })
        .catch(err => {
          console.dir(err)
        })
        .finally(() => {
          this.$store.commit('global/setLoader', false);
        })
    },
  },
  mounted() {
    this.$store.commit('global/setLoader', true)
    if(this.$route.query.id) {
      let ticketData
      this.$axios.get(`${process.env.API}/db/tickets?where=id&value=${this.$route.query.id}`)
        .then(ticket => {
          ticketData = ticket.data[0]
          this.campaignId = ticketData.campaignId;
          return this.$axios.get(`${process.env.API}/db/users?where=id&value=${ticketData.userId}`)
        })
        .then(user => {
          this.ticket = {
            campaignId: ticketData.campaignId,
            orderId: ticketData.orderId,
            ticketId: ticketData.ID,
            userId: ticketData.userId,
            quiz: ticketData.quiz,
            date: ticketData.created.toString(),
            size: ticketData.size,
            user: {
              firstName: user.data[0].firstName,
              lastName: user.data[0].lastName,
              email: user.data[0].email,
              phone: user.data[0].phone,
              image: user.data[0].image,
            },
          };
        })
        .finally(() => {
          this.$store.commit('global/setLoader', false);
        })
    } else {
      window.history.back()
    }
  },
};
</script>

<style lang="scss" scoped>
.page-ticket {
  padding: 60px 0;
}

h4 {
  color: #fff;
  font-size: 18px;
  margin-bottom: 30px;
  b {
    color: var(--active);
    font-weight: 700;
  }
}

.resend {
  display: flex;
  align-items: baseline;
  @media (min-width: 576px) {
    align-items: center;
  }
  &-btns{
    display: flex;
    align-items: center;
    flex-direction: column;
    @media (min-width: 576px) {
      flex-direction: row;
    }
  }
  h3 {
    color: #fff;
    font-size: 18px;
    min-width: 115px;
  }
  button {
    background: none;
    border: 2px solid #fff;
    border-radius: 8px;
    color: #fff;
    padding: 5px 15px;
    margin: 0 0 10px 15px;
    transition: 0.3s ease;
    width: 100%;
    @media (min-width: 576px) {
      margin: 0 0 0 15px;
      width: auto;
    }
    &:hover {
      background: var(--active);
      border-color: var(--active);
    }
  }
}

.btn {
  &-dinner {
    display: block;
    padding: 30px 50px;
    background: var(--active);
    border-radius: 20px;
    font-weight: 700;
    font-size: 24px;
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    color: #000000;
    margin-bottom: 30px;
    transition: 0.3s ease;
    &:hover {
      background: #414141;
      color: #fff;
    }
  }
}

.mode-white{
  h4{
    color: var(--prime);
  }
  .resend{
    h3 {
      color: var(--prime);
    }
    button {
    border-color: var(--active);
    color: var(--active);
    }
  }
}
</style>