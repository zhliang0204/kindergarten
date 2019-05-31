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

  // router/child.js
  // create child
  createChild(childInfo){
    return service
            .post("/child/createChild", childInfo)
            .then(res => {
              return res.data
            })
            .catch(errHandler)
  },

  getAllChildren(){
    return service
           .get("/child/allChildren")
           .then(res => {
             return res.data
           })
           .catch(errHandler)
  },

  findOneChild(childId){
    return service
           .get("/child/info/" + childId)
           .then(res => {
             return res.data
           })
           .catch(errHandler)
  },

  findChildByParent(parentId){
    return service
            .get("/child/childinfo/" + parentId)
            .then(res => {
              return res.data
            })
            .catch(errHandler)
  },

  // parents management
  getAllParentAccordToRole(parentRole){
    return service
            .get("/parent/all/" + parentRole)
            .then(res => {
              return res.data
            })
            .catch(errHandler)
  },

  getAllemails(){
    return service
            .get("/allemails")
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

  bindWithParent(parentAndChildInfo){
    return service
            .post("/relateParent",parentAndChildInfo)
            .then(res => {
              return res.data
            })
            .catch(errHandler)
  },

  getParent(parentId){
    return service
            .get("/parent/"+parentId)
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

  // userActive(accountInfo){
  //   return service
  //           .post("/useractive", accountInfo)
  //           .then(res => {
  //             return res.data
  //           })
  //           .catch(errHandler)
  // },
  // set password
  setPassword(userId, userInfo){
    return service
            .post("/setpws/" + userId, userInfo)
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
        .get('/events/all')
        .then(res => res.data)
        .catch(errHandler)
  },

  getSelectedEvent(id) {
    return service
        .get('/events/info/'+id)
        .then(res => res.data)
        .catch(errHandler)
  },

  createEvent(event){
    return service
          .post('/events/create', event)
          .then(res => res.data)
          .catch(errHandler)
  },

  
  getVote(eventId){
    return service
            .get("/events/vote/result/"+eventId) 
            .then(res => res.data)
            .catch(errHandler)
  },

  getPositiveVote(eventId){
    return service
            .get("/events/vote/positive/result/" + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  getNegtiveVote(eventId){
    return service
            .get("/events/vote/negtive/result/" + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  getPersonalVote(eventId){
    return service
            .get("/events/vote/personal/"+eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  postPersonalVote(eventId, voteInfo){
    return service
            .post("/events/vote/" + eventId, voteInfo)
            .then(res => res.data)
            .catch(errHandler)
  },

  removePersonalVote(eventId){
    return service
            .post("/events/vote/cancel/" + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },
  // // ------------------------------------
  // // get all
  // getselectedEventAll(id){
  //   return service
  //             .get('/missions/all/' + id)
  //             .then(res => res.data)
  //             .catch(errHandler)
  // },


  // ------------------------------------
  // service discussion related
  getDisscussion(id){
    return service
            .get('/events/discussion/'+id)
            .then(res => res.data)
            .catch(errHandler)
  },

  postDiscussion(id, discuss){
    return service
        .post('/events/discussion/person/'+id, discuss)
        .then(res => res.data)
        .catch(errHandler)
  },

  // ---------------------------------------
  // service application related
  getApplication(id){
    return service
            .get('/events/application/'+id)
            .then(res => res.data)
            .catch(errHandler)
  },

  postPersonApplication(id, applyInfor){
    return service
            .post('/events/application/person/'+id, applyInfor)
            .then(res => res.data)
            .catch(errHandler)
  },

  getPersonApplication(eventId){
    return service
            .get('/events/application/person/' + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  removPersonalApplication(eventId){
    return service
            .post("/events/application/cancel/person/" + eventId)
            .then(res => res.datn)
            .catch(errHandler)
  },

  // ---------------------------------------
  // service attendants related
  getAttendence(id){
    return service
            .get('/events/attendence/'+id)
            .then(res => res.data)
            .catch(errHandler)
  },

  checkAttandants(eventId){
    return service
            .get("/user/process/" + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  createFinals(eventId){
    return service
            .post("/user/finish/" + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },
  // ---------------------------------------
  // email related
  createUserMail(userInfo){
    return service
            .post('/mail/userMail', userInfo)
            .then(res =>res.data)
            .catch(errHandler)
  },

  createEventMail(eventInfo){
    return service
            .post("/mail/createEventEmail", eventInfo)
            .then(res => res.data)
            .catch(errHandler)
  },

  participantsChooseTimeMail(eventId){
    return service
            .post("/mail/event/participant/timechoose/" + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  createEventFinshInfoMail(eventId){
    return service 
            .post("/mail/eventfinish/" + eventId)
            .then(res => res.data)
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

  getAllTaskHoursoFYear(year){
    return service
            .get("/user/all/history/" + year)
            .then(res => res.data)
            .catch(errHandler)
  },
 
  getTotalTaskHousoFYear(year){
    return service
            .get("/user/totalHistory/" + year)
            .then(res => res.data)
            .catch(errHandler)
  },

  getCurrentTaskHoursoFAll(){
    return service
            .get("/user/all/current")
            .then(res => res.data)
            .catch(errHandler)
  },

  personalDoingTask(){
    return service
            .get('/user/all/process')
            .then(res =>res.data)
            .catch(errHandler)
  },

  personalFinshTask(){
    return service
            .get('/user/all/finish')
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


  // ---------------------------------------
  // personal service related
  getPersonaHistoryService(){
    return service
            .get('/user/history')
            .then(res => res.data)
            .catch(errHandler)
  },

  getPersonalEvent(){
    return service
            .get("/user/all")
            .then(res => res.data)
            .catch(errHandler)
  },

  getPersonalSelectedEvent(eventId){
    return service
            .get("/user/process/"+eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  orgPostDateSlots(eventId, dateInfo){
    return service
            .post("/user/process/org/"+eventId, dateInfo)
            .then(res => res.data)
            .catch(errHandler)
  },

  changeStateofPraticipant(eventId){
    return service
            .post("/user/process/part/" + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  getPossibleDateForParticipant(eventId){
    return service
            .get("/user/process/possibleDate/" + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  changeCheckedParticipant(eventId,dateInfo){
    return service
            .post("/user/process/datePick/part/"+eventId, dateInfo)
            .then(res => res.data)
            .catch(errHandler)
  },

  getEditEvent(eventId){
    return service
            .get("/user/editEvent/" + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  postCancelEvent(eventId){
    return service
            .post("/user/cancel/" + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  updateProEvent(eventId, updateInfo){
    return service
            .post("/user/updateEvent/" + eventId, updateInfo)
            .then(res => res.data)
            .catch(errHandler) 
  },

  removeAtt(attId){
    return service
            .post("/user/removeAtts/" + attId)
            .then(res => res.data)
            .catch(errHandler)
  },

  addAtt(userInfo){
    return service
            .post("/user/addAtts", userInfo)
            .then(res => res.data)
            .catch(errHandler)
  },

  getPossibleUser(eventId){
    return service  
            .get("/user/possibleAtt/" + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  updateDatesSlot(eventId, selectDateKeys){
    return service
            .post("/user/process/datePickStatus/part/"+eventId,selectDateKeys)
            .then(res => res.data)
            .catch(errHandler)
  },


  // finish Event
  getFinalAttendants(eventId){
    return service
            .get("/user/finish/event/" + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  postFinalsWorkHours(eventId, workInfo){
    return service
            .post("/user/finish/event/" + eventId, workInfo)
            .then(res => res.data)
            .catch(errHandler)
  },

  updateTotalCurServiceHours(eventId){
    return service
            .post("/user/finish/updateService/" + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  updatePersonCurServiceHours(eventId){
    return service
            .post("/user/finish/personalupdate/" + eventId)
            .then(res => res.data)
            .catch(errHandler)
  },

  // addPicture(file) {
  //   const formData = new FormData()
  //   formData.append("picture", file)
  //   return service
  //     .post('/endpoint/to/add/a/picture', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then(res => res.data)
  //     .catch(errHandler)
  // },
}
