<template>
  <section class="page page-ticket-add">
    <div class="container">
      <h1 class="title">Add New Ticket</h1>
      <form @submit="submit" class="form">
        <div class="field field__half">
          <label for="firstName">First name</label>
          <input type="text" v-model="data.firstName" id="firstName" required />
        </div>
        <div class="field field__half">
          <label for="lastName">Last name</label>
          <input type="text" v-model="data.lastName" id="lastName" required />
        </div>
        <div class="field field__half">
          <label for="email">E-mail</label>
          <input type="email" v-model="data.emailAddress" id="email" required />
        </div>
        <div class="field field__half">
          <label for="phone">Phone</label>
          <input type="tel" v-model="data.phoneNumber" id="phone" required />
        </div>
        <div class="field field__half">
          <label for="campaignId">Konnektive campaignId</label>
          <input type="text" v-model="data.campaignId" id="campaignId" required />
        </div>
        <div class="field field__half">
          <label for="orderId">Konnektive orderId</label>
          <input type="text" v-model="data.orderId" id="orderId" required />
        </div>
        <div class="field field__half">
          <label for="sweatshirt">Choose sweatshirt size</label>
          <select id="sweatshirt" v-model="data.size" required >
            <option v-for="item in sweatshirts" :value="item">{{ item }}</option>
          </select>
        </div>
        <div class="field field__half">
          <input type="submit" value="Add Ticket">
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default{
  data(){
    return{
      data: {
        date: (new Date()).getTime(),
        firstName: null,
        lastName: null,
        emailAddress: null,
        phoneNumber: null,
        campaignId: null,
        orderId: null,
        size: 'L',
      },
      sweatshirts: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    }
  },
  methods: {
    submit(e){
      e.preventDefault()
      this.$store.commit('global/setLoader', true)
      this.$axios.post(`${process.env.API}/db/insert`, {
        params: {
          table: 'users',
          data: {
            email: this.data.emailAddress,
            firstName: this.data.firstName,
            lastName: this.data.lastName,
            phone: this.data.phone
          }
        }
      })
        .then(res => {
          if(res.data.status && res.data.status === 'error'){
            return this.$axios.get(`${process.env.API}/db/users?where=email&value=${this.data.emailAddress}`)
              .then(users => {
                return users.data[0].ID
              })
          } else {
            return res.data.insertId
          }
        })
        .then(userId => {
          if(userId){
            return this.$axios.post(`${process.env.API}/db/insert`, {
              params: {
                table: 'tickets',
                data: {
                  orderId: this.data.orderId,
                  userId: userId,
                  campaignId: this.data.campaignId,
                  size: this.data.size,
                }
              }
            })
          } else {
            this.$store.commit('global/setAlert', `I don't see userId`)
          }
        })
        .then(res => {
          console.dir(res)
          this.$store.commit('global/setAlert', 'Ticket was added to order.')
          setTimeout(()=>{
            this.$router.push({
              path: '/order',
              query: {
                id: this.data.orderId,
              }
            })
            this.data.firstName = null
            this.data.lastName = null
            this.data.emailAddress = null
            this.data.phoneNumber = null
            this.data.campaignId = null
            this.data.orderId = null
            this.data.size = 'L'
          }, 3000);
        })
        .catch(err => {
          console.dir(err)
        })
        .finally(() => {
          this.$store.commit('global/setLoader', false)
        })
    }
  },
  mounted(){
    if(this.$route.query.orderId) this.data.orderId = this.$route.query.orderId
    if(this.$route.query.campaignId) this.data.campaignId = this.$route.query.campaignId
    if(this.$route.query.firstName) this.data.firstName = this.$route.query.firstName
    if(this.$route.query.lastName) this.data.lastName = this.$route.query.lastName
    if(this.$route.query.emailAddress) this.data.emailAddress = this.$route.query.emailAddress
    if(this.$route.query.phoneNumber) this.data.phoneNumber = this.$route.query.phoneNumber
  }
}
</script>

<style lang="scss" scoped>
.page-ticket-add{
  padding: 60px 0;
  .title{
    text-align: center;
    margin-bottom: 45px;
  }
  .form{
    width: 1000px;
  }
}
</style>