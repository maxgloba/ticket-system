<template>
  <section class="user-section">
    <div class="container">
      <div class="user-info">
        <h1 class="title">Your account info:</h1>

        <form @submit="updateUser" class="form form-user">
          <div class="field">
            <label for="firstName">First Name:</label>
            <input type="text" v-model="firstName" id="firstName" required />
          </div>
          <div class="field">
            <label for="lastName">Last Name:</label>
            <input type="text" v-model="lastName" id="lastName" required />
          </div>
          <div class="field">
            <label for="email">Email:</label>
            <input type="email" v-model="email" id="email" readonly required />
          </div>
          <div class="field" v-if="role === 'admin' || role === 'manager'">
            <label for="rol">Role:</label>
            <input type="text" v-model="userRole" id="rol" readonly required />
          </div>
          <div class="field">
            <label for="phone">Phone:</label>
            <input type="tel" @input="phoneNumberInput" v-model="phone" id="phone" maxlength="14" required />
          </div>
          <div class="field-submit">
            <input type="submit" value="Save changes" />
          </div>
        </form>

        <div class="btn-group">
          <button class="btn btn-change" @click="togglePass">Change Password</button>
          <button class="btn btn-change" @click="toggleRole" v-if="role === 'admin' || role === 'manager'">Change Role</button>
        </div>

        <form v-if="changePassword" @submit="setNewPassword" class="form form-password">
          <div class="field">
            <label for="passwordOld">Old Pass:</label>
            <input type="text" v-model="passwordOld" id="passwordOld" placeholder="Insert old password" minlength="6" maxlength="20" />
          </div>
          <div class="field">
            <label for="passwordNew">New Pass:</label>
            <input type="text" v-model="passwordNew" id="passwordNew" placeholder="Insert new password" minlength="6" maxlength="20" />
          </div>
          <div class="field-submit">
            <input type="submit" value="Change password" />
          </div>
        </form>

        <form v-if="changeRole && (role === 'admin' || role === 'manager')" @submit="updateRole" class="form form-role">
          <div class="field field-role">
            <label for="roleNew">New Role:</label>
            <select id="roleNew" v-model="roleNew">
              <option disabled value>Choose Role</option>
              <option v-for="item in roles" :value="item.name" :key="item.name">{{ item.name }}</option>
            </select>
          </div>
          <div class="field-submit">
            <input type="submit" value="Change role" />
          </div>
        </form>
      </div>

      <button v-if="email === 'max@purpleadlab.com'" @click="selAll">Set all passwords</button>

      <h2 class="title">Tickets:</h2>
      <Ticket v-for="ticket in tickets.slice().reverse()" :key="`ticket_${ticket.orderId}`" :data="ticket" />
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return{
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      passwordOld: null,
      passwordNew: null,
      changePassword: false,
      roles: null,
      userRole: null,
      rol: null,
      roleNew: '',
      changeRole: false,
      tickets: [],
      user: null
    }
  },
  filters: {
    setDate: time => {
      return new Date(Number(time)).toLocaleString('en', {month: '2-digit', day: '2-digit', year: 'numeric'});
    }
  },
  computed: {
    userData(){return this.$store.getters['global/getUser']},
    role: {
      get(){return this.$store.getters['global/getRole']},
      set(role){this.$store.commit('global/setRole', role)}
    }
  },
  methods: {
    selAll(e){
      e.preventDefault()
      this.$axios.post(`${process.env.API}/login/set-all`, {
        params: data
      })
    },
    togglePass(e){
      this.changePassword = (this.changePassword) ? false : true
      this.changeRole = false
    },
    toggleRole(e){
      this.changeRole = (this.changeRole) ? false : true
      this.changePassword = false
    },
    setNewPassword(e){
      e.preventDefault()
      this.$axios.post(`${process.env.API}/login/change-password`, {
        params: {
          passwordOld: this.passwordOld,
          passwordNew: this.passwordNew,
          email: this.email
        }
      })
        .then(response => {
          this.passwordOld = null
          this.passwordNew = null
          this.changePassword = false
          if(response.data.changedRows === 1){
            this.$store.commit('global/setAlert', 'Your password was changed!')
          } else {
            alert(response.data.msg)
          }
        })
    },
    phoneNumberInput(e) {
      let arr = e.target.value.replace(/[^\dA-Z]/g, '').replace(/[\s]/g, '').split('');
      this.phone = arr.toString().replace(/[,]/g, '');
    },
    updateUser(e){
      e.preventDefault()
      this.$axios.post(`${process.env.API}/db/updates`, {
        params: {
          table: 'users',
          data: {
            index: this.user.ID,
            keys: ['firstName', 'lastName', 'phone'],
            values: [this.firstName, this.lastName, this.phone]
          }
        }
      })
        .then(response => {
          this.$store.commit('global/setAlert', 'Your changes was saved!')
          this.tickets = []
          this.getUserInfo(this.$route.query.id)
        })
    },
    goToOrderPage(orderId){
      this.$router.push({path: '/order', query:{id: `${orderId}`} })
    },
    updateRole(e){
      e.preventDefault()
      if(this.userRole !== this.roleNew){
        this.roles.forEach((role, index) => {
          const users = JSON.parse(role.users),
              userId = this.user.ID,
              userIndex = users.indexOf(userId)
          console.dir(this.userRole)
          console.dir(role.name)
          if(this.userRole === role.name){
            users.splice(userIndex, 1)
            this.$axios.post(`${process.env.API}/db/updates`, {
              params: {
                table: 'roles',
                data: {
                  index: role.ID,
                  keys: ['users'],
                  values: [JSON.stringify(users)]
                }
              }
            })
              .then(response => {
                console.dir(response);
              })
          } else if(this.roleNew === role.name){
            users.push(userId)
            this.$axios.post(`${process.env.API}/db/updates`, {
              params: {
                table: 'roles',
                data: {
                  index: role.ID,
                  keys: ['users'],
                  values: [JSON.stringify(users)]
                }
              }
            })
              .then(response => {
                if(response.changedRows === 1){
                  this.$store.commit('global/setAlert', 'Your role was changed!')
                  this.getRoles(userId)
                } else {
                  alert(response.msg)
                }
              })
          }
        })
      }
      this.roleNew = ''
      this.changeRole = false
    },
    getRoles(ID){
      this.$axios.get(`${process.env.API}/db/roles`)
        .then(roles => {
          this.roles = roles.data
          roles.data.forEach(role => {
            const users = JSON.parse(role.users),
                  userId = Number(ID)
            if(users.includes(userId)){
              this.userRole = role.name
            }
          })
        })
    },
    translateRoles(){

      const usersID = []
      this.$axios.get(`${process.env.API}/db/roles`)
        .then(roles => {
          this.roles = roles.data
          this.$axios.get(`${process.env.API}/db/users`)
            .then(users => {
              users.data.forEach(user => {
                usersID.push(user.ID)
              })
              roles.data.forEach(role => {
                const usersRole = JSON.parse(role.data.users)
                if(role.name === 'client'){
                  const unic = diff(usersRole, usersID)
                  const newArray = diff(usersRole, unic)
                  function diff( a, b) {
                    let diff = a.filter((e)=>!~b.indexOf(e));
                    return diff.concat(b.filter((e)=>!~a.indexOf(e)));
                  }
                }
              })
            })
        })
    },
    getUserInfo(ID){
      this.$axios.get(`${process.env.API}/db/users?where=ID&value=${ID}`)
        .then(user => {
          this.firstName = user.data[0].firstName
          this.lastName = user.data[0].lastName
          this.email = user.data[0].email
          this.phone = user.data[0].phone
          this.user = user.data[0]
          return this.$axios.get(`${process.env.API}/db/tickets?where=userId&value=${ID}`)
        })
        .then(tickets => {
          tickets.data.forEach((ticket, index) => {
            this.tickets.push({
              orderId: ticket.orderId,
              ticketId: ticket.ID,
              userId: ID,
              date: ticket.created,
              qr: null,
              size: ticket.size,
              user: this.user,
              campaignId: ticket.campaignId
            })
            this.$axios.get(`${process.env.API}/qr?ticketId=${ticket.ID}`)
              .then(qr => {
                this.tickets[index].qr = qr.data
              })
          })
        })
    }
  },
  mounted(){
    if(this.$route.query.id && (this.userData.ID === this.$route.query.id || ['admin','manager'].includes(this.role)) ){
      this.getUserInfo(this.$route.query.id)
      this.getRoles(this.$route.query.id)
    } else {
      this.$router.push('/geek-in')
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  max-width: 600px;
  width: 100%;
  margin-bottom: 20px;
  .field {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--active);
    input{
      border: none;
    }
    label{
      min-width: 100px;
      color: var(--active);
      margin: 0;
    }
  }
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  img {
    &:first-child {
      width: 70px;
      height: 70px;
      margin-bottom: 25px;
      @media (min-width: 576px) {
        width: 107px;
        height: 107px;
      }
    }
  }
  h2 {
    font-weight: bold;
    font-size: 48px;
    line-height: 56px;
    margin-bottom: 25px;
    color: var(--opposite);
  }
}

.btn {
  &-group {
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
  }
  &-change {
    // width: 100%;
    display: block;
    border: none;
    height: 50px;
    border-radius: 1px;
    background: none;
    border: 2px solid var(--active);
    font-weight: 400;
    font-size: 15px;
    color: #fff;
    padding: 0 30px;
    margin: 0 30px;
    transition: background 0.25s ease;
    &:hover {
      background: var(--active);
    }
  }
}
</style>