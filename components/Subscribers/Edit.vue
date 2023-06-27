<template>
  <div class="subs-wrap">
    <form @submit="submit" class="subs-form">
      <button class="subs-close" @click="$parent.changeSubscriber = false">+</button>
      <div class="field">
        <h3>Change customer card</h3>
      </div>
      <div class="field">
        <label for="cardNumber">Card Number</label>
        <input
          type="text"
          v-model="cardNumber"
          @input="cardNumberInput"
          id="cardNumber"
          minlength="18"
          maxlength="19"
          placeholder="0000 0000 0000 0000"
          required>
      </div>
      <div class="field field-triple">
        <label for="cardMonth">Month</label>
        <input
          type="text"
          v-model="cardMonth"
          id="cardMonth"
          minlength="1"
          maxlength="2"
          placeholder="MM"
          required>
      </div>
      <div class="field field-triple">
        <label for="cardYear">Year</label>
        <input
          type="text"
          v-model="cardYear"
          id="cardYear"
          minlength="2"
          maxlength="2"
          placeholder="YY"
          required>
      </div>
      <div class="field field-triple">
        <label for="cardSecurityCode">CVV</label>
        <input
          type="text"
          v-model="cardSecurityCode"
          id="cardSecurityCode"
          minlength="3"
          maxlength="4"
          placeholder="***"
          required>
      </div>
      <div class="field">
        <input type="submit" value="Submit">
      </div>
    </form>
  </div>
</template>

<script>
export default{
  props: ['orderId', 'emailAddress'],
  data(){
    return{
      cardMonth: null,
      cardNumber: null,
      cardYear: null,
      cardSecurityCode: null,
    }
  },
  methods: {
    submit(e){
      e.preventDefault()
      this.$store.commit('global/setLoader', true)
      this.$axios.post(`${process.env.API}/konnektive/changecard`, {
        params: {
          orderId: this.orderId,
          emailAddress: this.emailAddress,
          cardMonth: Number(this.cardMonth),
          cardNumber: Number(this.cardNumber.replace(/[^\dA-Z]/g, '').replace(/[\s]/g, '')),
          cardYear: Number(`20${this.cardYear}`),
          cardSecurityCode: Number(this.cardSecurityCode),
        }
      })
        .then(res => {
          console.dir(res.data)
          alert(`${res.data.result}! ${res.data.message}`)
          if(res.data.result !== "ERROR"){
            this.$parent.changeSubscriber = false
          }
        })
        .catch(err => {
          alert(err)
          console.log(err)
        })
        .finally(() => {
          this.$store.commit('global/setLoader', false)
        })
    },
    cardNumberInput() {
      let arr = this.cardNumber.replace(/[^\dA-Z]/g, '').replace(/[\s]/g, '').split('');
      if (arr.length > 4) arr.splice(4, 0, ' ');
      if (arr.length > 9) arr.splice(9, 0, ' ');
      if (arr.length > 14) arr.splice(14, 0, ' ');
      this.cardNumber = arr.toString().replace(/[,]/g, '');
    },
  }
}
</script>

<style lang="scss" scoped>
.subs{
  &-wrap{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 998;
    background: rgba(0,0,0, .95);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--opposite);
  }
  &-close{
    width: 45px;
    height: 45px;
    padding: 0;
    margin: 0;
    position: absolute;
    right: 10px;
    top: 10px;
    border: 1px solid var(--opposite);
    color: var(--opposite);
    background: none;
    border-radius: 50%;
    font-size: 30px;
    font-weight: 100;
    transform: rotate(45deg);
    &:hover{
      opacity: .5;
    }
  }
  &-form {
    position: relative;
    max-width: 100%;
    width: 600px;
    margin: 0 auto;
    background: var(--prime);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 60px 30px;
    .field {
      position: relative;
      width: 100%;
      &:not(:first-child) {
        margin-top: 15px;
      }
      &:last-child {
        margin-top: 30px;
      }
      &-triple{
        width: calc(100% / 3 - 10px);
      }
    }
    h3{
      text-align: center;
      margin-bottom: 10px;
      font-weight: 900;
      font-size: 30px;
      line-height: 66px;
    }
    label {
      font-size: 16px;
      line-height: 1.2;
      margin-bottom: 5px;
      display: block;
    }
    input {
      width: 100%;
      display: block;
      height: 60px;
      border: 1px solid var(--opposite);
      background: none;
      color: var(--opposite);
      padding: 0 15px;
      transition: box-shadow 0.5s ease;
      font-size: 16px;
      @media (min-width: 768px) {
        padding: 0 30px;
        font-size: 20px;
      }
      &:focus {
        box-shadow: 0 0 0 3px var(--active) inset;
      }
      &[type="submit"] {
        background: var(--active);
        border: 2px solid var(--active);
        font-weight: bold;
        font-size: 18px;
        transition: 0.5s ease;
        &:hover {
          background: #1e2022;
        }
      }
      &[type="text"] + svg path:first-child {
        display: none;
      }
    }
  }
}
</style>