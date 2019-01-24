
var sec, min, hr, count, start_time, end_time, time_diff
var counter = 0;
var play = document.getElementById("play_butt");
var ticker = document.getElementById("ticker");
var check = document.querySelectorAll("input[type=checkbox]");
var goal_check = document.querySelectorAll("input[type=text]");
var session = document.getElementById("session");
var session_name = document.querySelectorAll("div.item p");
var session_length = document.querySelectorAll(".time_adjust");
var notify_sound = new Audio("../assets/audio/open-ended.mp3");
var wave = document.getElementById("wave");
var alert = document.querySelector('div.alert span');

window.onload = function() {
  checking_checks();
}

//function to set height and width of device without mobile keyboard affecting layout
(function(){
  var h = Math.max(document.documentElement.clientHeight || 0);
  var w = Math.max(document.documentElement.clientWidth || 0);
  $("html").css({"width": w, "height": h});
  $("body").css({"width": w, "height": h});
  }());


function toggleAlert(){
    //$(".alert").toggleClass('in out'); 
    $('.alert').fadeOut();
    return false; // Keep close.bs.alert event from removing from DOM
}

var session_assign = function() {
  if (counter === 5) {
    session_name = "Long Break";
    x = 2;
  } 
    else if (counter % 2 === 1) {
    session_name = "Short Break";
    x = 1;
  } 
    else {
    for (i = 0; i < 5; i++) {
      if (check[i].checked == false) {
        var session_name = goal_check[i].value;
        x = 0;
        break;
      }
    }

    if (session_name === "" && session_length[x].value != 0) {
      session_name = "Thinking...";
    }
  }
  session.innerHTML = session_name;
}


//Assign Event Listener to Checks
var checking_checks = function() {
  for (i = 0; i < 5; i++) {
    check[i].addEventListener('change', () => {
      crossout();
    })
  }
}

var rise = function(){
     if (play.innerHTML === "Start" && counter > 0){
            var end = new Date().getTime() + 4000;
                setInterval(function(){
                    var start = new Date().getTime();
                    var time_diff2 = end - start;
                    if(time_diff2 <= 0){
                        clearInterval();
                    }
                    else{
                        wave.style.transform = "translateY(" + (70 - (70*(1-(time_diff2/4000)))) + "%)"; 
                    }
                })   
            }
}

//Crossing out goals that have been checked/completed
var crossout = function() {
  for (i = 0; i < 5; i++)
    if (check[i].checked == true) {
      goal_check[i].style.textDecoration = "line-through";
    }
  else {
    goal_check[i].style.textDecoration = "none";
  }
}
var notify = function() {
  notify_sound.play();
  alert.innerHTML = session_name[x].innerHTML + " Complete!";
  $('.alert').fadeIn();
  $('#bsalert').on('close.bs.alert', toggleAlert)
}

//This acts as a list of functions
var timer = {
  //Starts the timer
  start: function() {
    if (play.innerHTML === "Pause") {
      timer.pause();
      return;
    } 
      else if (play.innerHTML === "Start" || play.innerHTML === "Resume") {
      session_assign();
      if (parseInt(session_length[x].value) === 0) {
        alert.innerHTML = "If only goals could be completed in an instant...";
        $('.alert').fadeIn();
        $('#bsalert').on('close.bs.alert', toggleAlert)
        return;
      }
      play.innerHTML = "Pause";
    }
    var ticker_time = ticker.innerHTML.split(" ");
    var resume_time = ((ticker_time[2] * 60) + (parseInt(ticker_time[4]))) * 1000

    sec = 0;
    min = 0;
    hr = 0;

    if (resume_time != 0) {
      end_time = new Date().getTime() + resume_time;
    } else {
      end_time = new Date().getTime() + (parseInt(session_length[x].value) * 60 * 1000);
    }

    count = setInterval(function() {
      start_time = new Date().getTime();
      time_diff = end_time - start_time;
      sec = timer.convert_s(time_diff);
      min = timer.convert_m(time_diff);
      hr = timer.convert_h(time_diff);

      tick_sec = timer.add_Zero(sec);
      tick_min = timer.add_Zero(min);
      tick_hr = timer.add_Zero(hr);


      timer.update(tick_hr + " : " + tick_min + " : " + tick_sec);
      timer.animate(time_diff/parseInt(session_length[x].value*60000))

      if (time_diff <= 50) {
        clearInterval(count);
        notify();
        play.innerHTML = "Start"
        counter += 1;
        rise();
      }
    })
  },

  animate: function(time_percent){
    if(time_percent > 0){
      wave.style.transform = "translateY(" + ((1-time_percent)*70) + "%)";
    }
  },
  convert_s: function(time) {
    var t;
    t = Math.floor((time % (1000 * 60)) / 1000);
    return t;
  },
  convert_m: function(time) {
    var t;
    t = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    return t;
  },
  convert_h: function(time) {
    var t;
    t = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return t;
  },

  add_Zero: function(time_alt) {
    var temp
    if (time_alt < 10) {
      temp = "0" + time_alt;
    } else {
      temp = time_alt;
    }
    return temp;
  },
  //fixed 0 pause bug by limiting pause funcitonality wrt time_diff
  pause: function() {
    if (time_diff > 1000) {
      clearInterval(count);
      play.innerHTML = "Resume";
    }
  },
  update: function(tick_text) {
    ticker.innerHTML = tick_text;
  },

}
