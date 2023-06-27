<template>
  <section class="page-ff">
    <div class="container">
      <header class="ff-header">
        <h1 class="title">Female Founders / <span>List</span></h1>
        <button class="btn btn-export" @click="exportContacts">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM272.1 264.4L224 344l48.99 79.61C279.6 434.3 271.9 448 259.4 448h-26.43c-5.557 0-10.71-2.883-13.63-7.617L192 396l-27.31 44.38C161.8 445.1 156.6 448 151.1 448H124.6c-12.52 0-20.19-13.73-13.63-24.39L160 344L111 264.4C104.4 253.7 112.1 240 124.6 240h26.43c5.557 0 10.71 2.883 13.63 7.613L192 292l27.31-44.39C222.2 242.9 227.4 240 232.9 240h26.43C271.9 240 279.6 253.7 272.1 264.4zM256 0v128h128L256 0z"/></svg>
          Export Contacts
        </button>
      </header>
      <table class="ff-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company url</th>
            <th>Company name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts">
            <td>{{ contact.firstName }} {{ contact.lastName }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.phone }}</td>
            <td>{{ contact['5'] }}</td>
            <td>{{ contact['157'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import XLSX from 'xlsx'
export default{
  data(){
    return{
      contacts: null,
    }
  },
  methods:{
    exportContacts(){
      const contactsObj = []
      this.contacts.forEach(contact => {
        const contactObj = {
          'Name': `${contact.firstName} ${contact.lastName}`,
          'Email': contact.email,
          'Phone': contact.phone,
          'Company url': contact['5'],
          'Company name': contact['157']
        }
        contactsObj.push(contactObj)
      })
      const contactsWS = XLSX.utils.json_to_sheet(contactsObj),
        wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, contactsWS, 'Contacts')
      XLSX.writeFile(wb, 'contacts.xlsx')
    },
  },
  mounted(){
    this.$store.commit('global/setLoader', true)
    let contacts = []
    this.$axios.post(`${process.env.API}/activecamp/get`, {
      params: { endpoint: 'https://purpleleads.api-us1.com/api/3/contacts?listid=112&status=1&orders[cdate]=ASC&limit=10000' }
    })
      .then(response => {
        contacts = response.data.contacts
        contacts.forEach((contact, index) => {
          this.$axios.post(`${process.env.API}/activecamp/get`, {
            params: { endpoint: contact.links.fieldValues }
          })
            .then(fieldsData => {
              if(fieldsData.data.fieldValues){
                fieldsData.data.fieldValues.forEach(field => {
                  if(field.field == 5 || field.field == 157){
                    contacts[index][field.field] = field.value
                  }
                })
              }
            })
        })
      })
      .finally(()=>{
        setTimeout(()=>{
          this.contacts = contacts
          this.$store.commit('global/setLoader', false)
        }, 2000);
      })
      .catch(err => {
        console.dir(err)
      })
  },
}
</script>

<style lang="scss" scoped>
.page-ff{
  padding-bottom: 50px;
}
.ff{
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
  &-header{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 15px;
  }
}
.btn{
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