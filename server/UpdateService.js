const User = require('./models/User');
const Event = require('./models/Event');
const Application = require('./models/Application');
const Final = require('./models/Final');
var schedule = require('node-schedule');

// test for schedule module
var j = schedule.scheduleJob('10 * * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});

function x(){
  console.log("test whether is works?")
}

// update service hours of last year;
// update every september
function updateServiceHours(){
  var date = new Date();
  var year = date.getFullYear() - 1;
  
  User.find().forEach(function(ele){
    let serviceHours = {year:year, serviceHours:ele.currentServiceHours}
    User.update({},{$push: {historyServiceHours:serviceHours}}, {$set: {currentServiceHours:0}})
  })
}

var updateServiceEveryYear = schedule.scheduleJob('0 0 1 9 *', function(){
  updateServiceHours();
})


// update FinalPerson;
// update every day
// function updateFinalPerson(){

// }

// update current year service hours
// update every day
function updateCurServiceHours(){
  Event.find({eventState:"close"})
        .populate("finals")
        .then(res => {
          
          res.forEach((finishEvent) => {
            let curEventHours = finishEvent.reqhours
            finishEvent.finals.forEach((final) =>{
                User.find({_id:_userId})
                .exec(function(err,data) {
                  if(err){
                    return
                  }
                  User.findByIdAndUpdate(request.id, {
                    $set:{
                      currentServiceHours:data.currentServiceHours+curEventHours
                    }},{
                      new:true
                    }
                  )
                })
            })
          })
        })
}

var updateServiceEveryDay = schedule.scheduleJob('1 0 * * *', function(){
  updateCurServiceHours();
})

module.exports = {
  updateServiceEveryYear,
  updateServiceEveryDay,
}