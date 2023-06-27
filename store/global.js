export const state = () => ({
  loader: false,
  alert: false,
  mode: false,
  popup: false,
  role: false,
  user: false,
  users: [],
  events: {
    1: 'San Diego',
    3: 'Miami',
    4: 'Barcelona',
    7: 'SWAP Miami',
    8: 'Nashville',
    11: 'Los Angeles',
    17: 'Execs',
    17: 'Lead Gen',
  },
  eventsDashboard: {
    11: 'Los Angeles',
    17: 'Execs',
    18: 'Lead Gen',
  },
  eventsList: {
    2023: [
      {
        campignId: 18,
        img: require('@/assets/img/events/leadgen.png'),
        title: 'GeekEx Lead Gen',
        date: 'June 9, 2023',
        desc: 'ALL THINGS FORMS FILLS AND CALLS',
        link: 'https://events.geekex.com/lead-gen/',
        schedule: [
          {
            title: 'June 9',
            subtitle: 'Coming soon...',
            list: ['Coming soon ...']
          },
        ],
      },
      {
        campignId: 17,
        img: require('@/assets/img/events/execs.png'),
        title: 'GeekEx Execs',
        date: 'April 21-22, 2023 (Friday-Saturday)',
        desc: 'EDUCATION FOR AFTER YOU’VE MADE YOUR MONEY. EXECUTIVE SUMMIT FEATURING TOM BILYEU.',
        link: 'https://events.geekex.com/geekex-execs',
        schedule: [
          {
            title: 'April 21 (Friday)',
            subtitle: 'Nick Shackelford’s House - 3824 E Casselle Ave, Orange, CA 92869',
            list: ['18:00-21:00 - Networking, Dinner, Drinks ']
          },
          {
            title: 'April 22 (Saturday)',
            subtitle: 'Nick Shackelford’s House - 3824 E Casselle Ave, Orange, CA 92869',
            list: ['08:00-09:00 - Breakfast','09:00-12:00 - Education','12:00-13:30 - Lunch','16:00-17:00 - Tom Bilyeu','13:30-16:00 - Education','17:00-20:00 - Networking, Dinner, Drinks ']
          },
        ],
      },
      {
        campignId: 11,
        img: require('@/assets/img/events/la-2023.jpg'),
        title: 'GeekEx Los Angeles',
        date: 'May 19-21',
        desc: 'Geek Out takes the show to Los Angeles. Brace yourselves for yet another leg of the ultimate in-person marketing event of the year',
        link: 'https://events.geekex.com/los-angeles',
        schedule: [
          {
            title: 'May 19 (Friday)',
            subtitle: 'TBD',
            list: ['18:00-19:30 - Dinner, Drinks, & Networking','19:30-21:30 - Hollywood Improv Comedy Show']
          },
          {
            title: 'May 20 (Saturday)',
            subtitle: 'TBD',
            list: ['08:00-09:00 - Breakfast','09:00-12:00 - Education','12:00-13:30 - Lunch','13:30-18:00 - Education','17:30-20:30 - Dinner, Drinks, & Networking']
          },
          {
            title: 'Feb 21 (Sunday)',
            subtitle: 'TBD',
            list: ['09:30-12:30 - Brunch']
          }
        ],
      },
    ],
    2022: [
      {
        campignId: 8,
        img: require('@/assets/img/events/nash.png'),
        title: 'GeekOut Nashville',
        date: 'November 3-5',
        desc: 'Geek Out takes the show to Nashville. Brace yourselves for yet another leg of the ultimate in-person marketing event of the year',
        link: 'https://geekoutevents.io/nashville',
        schedule: [
          {
            title: '3 November',
            subtitle: '   ',
            list: [`<b>19:00-22:00</b> - Welcome <br> Party - (Gray & Dudley)`],
            listsub: false
          },
          {
            title: '4 November',
            subtitle: ' ',
            list: ['<b>07:30-08:30</b> - Breakfast','<b>08:30-12:00</b> - Education','<b>12:00-13:30</b> - Lunch','<b>13:30-16:00</b> - Education','<b>17:30-20:30</b> - Networking & Drinks - (21C Museum Hotel)'],
            listsub: false
          },
          {
            title: '5 November',
            subtitle: ' ',
            list: ['<b>08:00-09:00</b> - Breakfast','<b>09:00-12:00</b> - Education','<b>12:00-13:30</b> - Lunch','<b>13:00-16:00</b> - Education','TBD - Networking & Drinks (Liquor Lab Nashville)'],
            listsub: false
          },
        ],
      },
      {
        campignId: 7,
        img: require('@/assets/img/events/swap_miami.png'),
        title: 'Swap Miami',
        date: 'September 9-11',
        desc: '',
        link: 'https://geekoutevents.io/swap/miami',
        schedule: [
          {
            title: '9 September',
            subtitle: 'SGWS Wynwood - 2105 N. Miami Avenue Miami, FL 33127',
            list: [`<b>8:00-14:00</b> - AV and event set up`, `<b>14:00-18:00</b> - Rehearsals`, `<b>18:00-20:00</b> - Welcome Party`],
            listsub: false
          },
          {
            title: '10 September',
            subtitle: 'SGWS Wynwood - 2105 N. Miami Avenue Miami, FL 33127',
            list: ['<b>07:30-08:30</b> - Continental Breakfast', '<b>08:30-12:00</b> - Education - Room 1', '<b>08:30-12:00</b> - Education - Room 2', '<b>12:00-13:30</b> - Lunch', '<b>13:30-16:00</b> - Education - Room 1', '<b>13:30-16:00</b> - Education - Room 2', '<b>16:30-18:30</b> - Networking and Drinks'],
            listsub: false
          },
          {
            title: '11 September',
            subtitle: 'SGWS Wynwood - 2105 N. Miami Avenue Miami, FL 33127',
            list: ['<b>07:30-08:30</b> - Continental Breakfast', '<b>08:30-12:00</b> - Education - Room 1', '<b>08:30-12:00</b> - Education - Room 2', '<b>12:00-13:30</b> - Lunch', '<b>13:30-16:00</b> - Education - Room 1', '<b>13:30-16:00</b> - Education - Room 2', '<b>16:30-18:30</b> - Networking/Drinks/Champagne Toast/Mixologist - (SGWS)'],
            listsub: false
          },
        ],
      },
      {
        campignId: 4,
        img: require('@/assets/img/events/barcelona.jpg'),
        title: 'GeekOut Barcelona',
        date: 'July 2-4',
        desc: 'Geek Out takes the show to Barcelona. Brace yourselves for yet another leg of the ultimate in-person marketing event of the year',
        link: 'https://geekoutevents.io/barcelona/',
        schedule: [
          {
            title: '2 JULY',
            subtitle: '',
            list: [`<b>18:30-20:30</b> - Welcome Party`],
            listsub: false
          },
          {
            title: '3 JULY',
            subtitle: '',
            list: ['<b>07:30-08:15</b> - Breakfast', '<b>08:20-11:35</b> - Education', '<b>11:40-13:00</b> - Lunch', '<b>13:05-16:00</b> - Education', '<b>16:00-18:00</b> - Small Group Tapas Tour', '<b>18:00-20:00</b> - Networking and Drinks'],
            listsub: false
          },
          {
            title: '4 JULY',
            subtitle: '',
            list: ['<b>09:00-10:00</b> - Breakfast', '<b>10:05-12:25</b> - Education', '<b>12:30-13:40</b> - Lunch', '<b>13:45-16:15</b> - Education', '<b>18:00-20:00</b> - Networking and Drinks'],
            listsub: false
          },
        ],
      },
      {
        campignId: 3,
        img: require('@/assets/img/events/miami.jpg'),
        title: 'GeekOut Miami',
        date: '12 May',
        desc: 'Geek Out takes the show to Miami. Brace yourselves for yet another leg of the ultimate in-person marketing event of the year',
        link: 'https://geekoutevents.io/miami/',
        schedule: [
          {
            title: '12 MAY',
            subtitle: '2105 N. Miami Avenue Miami, FL 33127',
            list: ['Rehearsals All speakers - 08:00 - 12:00', 'Experience - Big Bus Tours - Everglades - 13:00 - 17:00', 'Welcome Dinner - Esotico - 19:00 - 22:00', 'Appetizers, tapas, drinks'],
            listsub: '16:00 NE 1ST Ave, Miami, FL 33132'
          },
          {
            title: '13 MAY',
            subtitle: 'SGWS Wynwood - 2105 N. Miami Avenue Miami, FL 33127',
            list: ['Breakfast - 07:30 - 08:30', 'Continental - pastries, coffee, tea, juice', 'Education- 08:30 - 12:00', 'Lunch - 12:00 - 13:00', 'Education - 13:00 - 16:00', 'Experience - Marlins vs Brewers Game at 6:40pm on the AutoNation Deck - 18:40-23:00', 'Includes game ticket, 2 drinks, and dinner'],
            listsub: 'LoanDepot Park - 501 Marlins Way, Miami, FL 33125'
          },
          {
            title: '14 MAY',
            subtitle: 'SGWS Wynwood - 2105 N. Miami Avenue Miami, FL 33127',
            list: ['Breakfast - 08:00 - 09:00', 'Continental - pastries, coffee, tea, juice', 'Education - 09:00 - 12:00', 'Lunch - 12:00 - 13:00', 'Education - 13:00 - 17:00', 'Drinks/Appetizers - 17:00 18:30', 'VIP Dinner - Bellmónt Spanish Restaurant - 19:00-22:00'],
            listsub: '339 Miracle Mile, Coral Gables, FL 33134'
          },
        ],
      },
      {
        campignId: 1,
        img: require('@/assets/img/events/sd.jpg'),
        title: 'GeekOut San Diego',
        date: '24 March',
        desc: 'Geek Out takes the show to San Diego. Brace yourselves for yet another leg of the ultimate in-person marketing event of the year',
        link: 'https://geekoutevents.io/san-diego',
        schedule: [
          {
            title: '24 MARCH',
            subtitle: 'Belmont Park - 3146 Mission Blvd, 2nd Level',
            list: ['3:00 pm - Speaker Rehearsals', '7:00 pm - Welcome Dinner'],
            listsub: false
          },
          {
            title: '25 MARCH',
            subtitle: 'Belmont Park - 3146 Mission Blvd, 2nd Level',
            list: ['9:00 am - Breakfast', '10:00 am - Morning Education', '12:30 pm - Lunch', '2:00 pm - Afternoon Education', '4:40 pm - Round Table Discussion', '7:00 pm Speaker &amp; VIP Dinner'],
            listsub: 'Waterbar - 4325 Ocean Blvd, San Diego, CA'
          },
          {
            title: '26 MARCH',
            subtitle: 'Belmont Park - 3146 Mission Blvd, 2nd Level',
            list: ['9:00 am - Breakfast', '10:00 am - Morning Education', '12:30 pm - Lunch', '2:00 pm - Afternoon Education', '4:40 pm - Round Table Discussion / Closing Remarks', '7:00 pm - Dinner & UFC Fight'],
            listsub: 'El Prez - 4190 Mission Blvd, San Diego, CA'
          },
          {
            title: '27 MARCH',
            subtitle: 'Belmont Park Beach House - 3125 Ocean Front Walk',
            list: ['11:00am - Networking / Brunch'],
            listsub: false
          }
        ],
      },
    ]
  },
  orders: null,
  tickets: []
})

export const getters = {
  getLoader: state => state.loader,
  getAlert: state => state.alert,
  getMode: state => state.mode,
  getRole: state => state.role,
  getUser: state => typeof state.user === 'string' ? JSON.parse(state.user) : state.user,
  orders: state => state.orders,
  tickets: state => state.tickets,
  getEvents: state => state.events,
  geteventsDashboard: state => state.eventsDashboard,
  eventsList: state => state.eventsList
}

export const mutations = {
  setLoader(state, res) {
    state.loader = res
  },
  setAlert(state, res) {
    state.alert = res
  },
  setPopup(state, res) {
    state.popup = res
  },
  setMode(state, mode) {
    state.mode = mode
  },
  setRole(state, role) {
    localStorage.role = role
    state.role = role
  },
  setUser(state, user) {
    state.user = user
    localStorage.user = typeof user === 'object' ? JSON.stringify(user) : user
  },
  setOrders(state, orders) {
    state.orders = orders
  },
  addTicket(state, ticket) {
    state.tickets.push(ticket)
  },
  resetTickets(state) {
    state.tickets = []
  },
}
export const actions = {
  getMode({ commit }) {
    const mode = (localStorage.mode) ? localStorage.mode : 'dark';
    localStorage.mode = mode;
    commit('setMode', mode);
  },
  getOrders({commit, dispatch, state}, campaignId) {
    commit('setLoader', true)
    commit('setOrders', null)
    const currentDay = new Date().toLocaleString('en', {month: '2-digit', day: '2-digit', year: 'numeric'}),
          orders = []
    this.$axios.post(`${process.env.API}/konnektive?endpoint=/order/query`, {
      params: {
        startDate: '01/01/2022',
        endDate: currentDay,
        campaignId: campaignId,
        resultsPerPage: 200
      }
    })
      .then(res => {
        if(res.result === "ERROR"){
          alert(`${res.result}! ${res.data.message}`)
        } else {
          orders.push(...res.data.message.data)
          if(Number(res.data.message.totalResults) > Number(res.data.message.resultsPerPage)){
            return this.$axios.post(`${process.env.API}/konnektive?endpoint=/order/query`, {
              startDate: '01/01/2022',
              endDate: currentDay,
              campaignId: campaignId,
              resultsPerPage: 200,
              page: 2
            })
              .then(res => {
                orders.push(...res.data.message.data)
              })
          }
        }
      })
      .finally(() => {
        dispatch('setTickets', orders)
        commit('setOrders', orders)
        commit('setLoader', false)
      })
  },
  setTickets({commit, dispatch}, orders){
    commit('resetTickets')
    orders.forEach(order => {
      if(order.orderStatus === 'COMPLETE' || (order.orderStatus === "REFUNDED" && Number(order.refundRemaining) > 0)){
        dispatch('getTicket', order.orderId)
      }
    })
  },
  getTicket({commit, state}, orderId){
    this.$axios.get(`${process.env.API}/db/tickets?where=orderId&value=${orderId}`)
      .then(response => {
        response.data.forEach(ticket => {
          this.$axios.get(`${process.env.API}/db/users?where=ID&value=${ticket.userId}`)
            .then(user => {
              const ticketData = {
                orderId: orderId,
                ticketId: ticket.ID,
                userId: ticket.userId,
                quiz: JSON.parse(ticket.quiz),
                date: ticket.created,
                size: ticket.size
              }
              if(user.data.length > 0){
                ticketData.user = {
                  firstName: user.data[0].firstName,
                  lastName: user.data[0].lastName,
                  email: user.data[0].email,
                  phone: user.data[0].phone,
                  image: user.data[0].image
                }
              }
              commit('addTicket', ticketData)
            })
          })
      })
  }
}
