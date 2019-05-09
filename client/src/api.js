import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')
  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'))
  },

  // This method signs up and logs in the user
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  // router/auth.js
  // create child
  createChild(childInfo){
    return service
            .post("/createChild", childInfo)
            .then(res => {
              return res.data
            })
            .catch(errHandler)
  },

  createParent(parentInfo){
    return service
            .post("/createParent", parentInfo)
            .then(res => {
              return res.data
            })
            .catch(errHandler)
  },

  // active account
  activeAccount(userId,accountInfo){
    return service
            .post("/active/" + userId, accountInfo)
            .then(res => {
              return res.data
            })
            .catch(errHandler)
  },

  // set password
  setPassword(userId, password){
    return service()
            .post("/setpws/" + userId, password)
            .then(res => {
              return res.data
            })
            .catch(errHandler)
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },

  createUser(userInfo){
    return service
            .post('/createUser', userInfo)
            .then(res=> {
              return res.data
            })
            .catch(errHandler)
  },

  // ---------------------------------------
  // events related
  getEvents() {
    return service
        .get('/missions')
        .then(res => res.data)
        .catch(errHandler)
  },

  getSelectedEvent(id) {
    return service
        .get('/missions/'+id)
        .then(res => res.data)
        .catch(errHandler)
  },

  createEvent(event){
    return service
          .post('/missions/create', event)
          .then(res => res.data)
          .catch(errHandler)
  },
  // ------------------------------------
  // get all
  getselectedEventAll(id){
    return service
              .get('/missions/all/' + id)
              .then(res => res.data)
              .catch(errHandler)
  },


  // ------------------------------------
  // service discussion related
  getDisscussion(id){
    return service
            .get('/discussions/'+id)
            .then(res => res.data)
            .catch(errHandler)
  },

  postDiscussion(id, content){
    return service
        .post('/discussions/'+id, content)
        .then(res => res.data)
        .catch(errHandler)
  },

  // ---------------------------------------
  // service application related
  getApplication(id){
    return service
            .get('/applications/'+id)
            .then(res => res.data)
            .catch(errHandler)
  },

  postApplication(id, applyInfor){
    return service
            .post('/applications/'+id, applyInfor)
            .then(res => res.data)
            .catch(errHandler)
  },

  // ---------------------------------------
  // email related
  createUserMail(emailInfo){
    return service
            .post('/mail/userMail', emailInfo)
            .then(res =>res.data)
            .catch(errHandler)
  },

  // ------------------------------------
  // personal mission statistic related
  personalMission(){
    return service
            .get('/user/history')
            .then(res =>res.data)
            .catch(errHandler)
  },

  // personal applicated misson
  personalApplication(){
    return service
            .get('user/application')
            .then(res => res.data)
            .catch(errHandler)
  },

  personalFinal(){
    return service
            .get('user/final')
            .then(res => res.data)
            .catch(errHandler)
  },


  // This is an example on how to use this method in a different file
  // api.getCountries().then(countries => { /* ... */ })
  // getCountries() {
  //   return service
  //     .get('/countries')
  //     .then(res => res.data)
  //     .catch(errHandler)
  // },

  // addCountry(body) {
  //   return service
  //     .post('/countries', body)
  //     .then(res => res.data)
  //     .catch(errHandler)
  // },

  // getSecret() {
  //   return service
  //     .get('/secret')
  //     .then(res => res.data)
  //     .catch(errHandler)
  // },

  addPicture(file) {
    const formData = new FormData()
    formData.append("picture", file)
    return service
      .post('/endpoint/to/add/a/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },
}
