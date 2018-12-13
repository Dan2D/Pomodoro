/*window.onload = checking_checks


//https://codepen.io/mythicalpizza/pen/WvdeJG (FOR LATER REFERNCE)

//Basic Timer 
var time_set = { 


var goal_check = document.querySelectorAll("#goal");
var check = document.querySelectorAll("input[type=checkbox]");
var play = document.getElementById("play_butt");
var session_count = 0 ;
var x = 0;
var z = 0;
var name = "";
//On Click starts CountDown
play.addEventListener('click', function(){
    z++;
    countdown();})   
    
    
//Checks if checkbox is checked if it is then the task is completed and the goal is struk through
function checking_checks(){
    var goal_check = document.querySelectorAll("#goal");
    for (i=0; i<5; i++){
        check[i].addEventListener('change', function(){
            for (i=0; i < 5; i++)
                if (check[i].checked == true){
                    goal_check[i].style.textDecoration = "line-through";}
                else {
                    goal_check[i].style.textDecoration = "none";}})}}
    
    //Tracker for breaks and work
function count(){
    session_count += 1;}


    function countdown(){
    for (i=0; i < 5; i++) {
            if (session_count % 2 == 1){
                if (session_count == 5){
                    session_name = "Long Break";
                    name = "Play/Pause";
                    x = 2;
                    break;}
                session_name = "Short Break";
                name = "Play/Pause";
                x = 1;
                break;}
            else {
                if (check[i].checked == false){
                    var session_name = goal_check[i].value;
                    x=0;
                    break;}}}
    //*****placeholder for now, want to change to break when session length ends*****
        if (session_name == ""){
            session_name = "Unknown";}
        document.getElementById('play_butt').innerHTML = "Start " + session_name + "?";     
        document.getElementById("session").innerHTML = session_name
    
   
    
    
    //Get timer for session first when play button is hit
    //Have to set it outside interval timer
        var session_length = document.querySelectorAll('.time_adjust')
        var countdown_time = new Date().getTime() + (session_length[x].value*1000*60);
            
        function addZero(i) {
        if (i < 10) {
            i = "0" + i;}
        return i;}
    
    //document.getElementById("timer").innerHTML = 

    
var time = setInterval(function(){
    var current_time = new Date().getTime();
    
  
    
    addZero()
    //alert(countdown_time + "    " + current_time);
    var time_diff = countdown_time - current_time;
    var hours = addZero(Math.floor((time_diff%(1000*60*60*24))/(1000*60*60)));
    var minutes = addZero(Math.floor((time_diff%(1000*60*60))/(1000*60)));
    var seconds = addZero(Math.floor((time_diff%(1000*60))/1000));
    
   //Pause          
    if (z % 2 == 0 && time_diff > 0){
    var pause_time = new Date().getTime();
    var pause_show = document.getElementById("timer").innerHTML;
    clearInterval(time);
    document.getElementById("timer").innerHTML = pause_show;
    return;}

    if (time_diff <= 0){
        hours = '00';
        minutes = '00';
        seconds = '00';
        clearInterval(time);
        count()};
    //need to keep track of set count to switch to s_break or l_break
     document.getElementById("timer").innerHTML =  hours + " : " + minutes + " : " + seconds;                  
})}}*/
var sec, min, hr, count, start_time, end_time, time_diff
var counter = 0;
var play = document.getElementById("play_butt");
var ticker = document.getElementById("ticker");
var check = document.querySelectorAll("input[type=checkbox]");
var goal_check = document.querySelectorAll("#goal");
var session = document.getElementById("session");
var session_length = document.querySelectorAll(".time_adjust");

window.onload = function(){
    checking_checks();
}


var session_assign = function(){
    if (counter === 5){
        session_name = "Long Break";
        x = 2;
        }
    else if (counter % 2 === 1){
        session_name = "Short Break";
        x = 1;
    }
    else { 
        for (i=0; i < 5; i++) {
            if (check[i].checked == false){
                var session_name = goal_check[i].value;
                x=0;
                break;
            }
        }
        
        if (session_name === ""){
            session_name = "Thinking..."
        }
    }    
    session.innerHTML = session_name}


//Assign Event Listener to Checks
var checking_checks = function(){
    for (i=0; i<5; i++){
        check[i].addEventListener('change', () => {
            crossout();
        })
    }
}
            
//Crossing out goals that have been checked/completed            
var crossout = function(){
    for (i=0; i < 5; i++)
        if (check[i].checked == true){
            goal_check[i].style.textDecoration = "line-through";
        }
        else {
            goal_check[i].style.textDecoration = "none";
        }
    }

//This acts as a list of functions
var timer = {
    //Starts the timer
    start : function(){
        if (play.innerHTML != "Start"){
                timer.pause();
                return;
            }
        else if (play.innerHTML === "Start"){
                play.innerHTML = "Pause";
                session_assign();
            }
        var ticker_time = ticker.innerHTML.split(" ");
        var resume_time = ((ticker_time[2]*60) + (ticker_time[4]))*1000
        
        sec = 0;
        min = 0;
        hr = 0;
        
        if (resume_time != 0) {
            end_time = new Date().getTime() + resume_time;
        }
        else{
            end_time = new Date().getTime() + (session_length[x].value*60*1000);
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

            if (time_diff <= 50){
                clearInterval(count);
                play.innerHTML = "Start"
                counter +=1;
            }
        })
    },                        
 
    convert_s : function(time){
        var t;
        t = Math.floor((time%(1000*60))/1000);
        return t;
    },
    convert_m : function(time){
        var t;
        t = Math.floor((time%(1000*60*60))/(1000*60));
        return t;
    },
    convert_h : function(time){
        var t;
        t = Math.floor((time%(1000*60*60*24))/(1000*60*60));
        return t;
    },
    
    add_Zero : function(time_alt){
        var temp
        if (time_alt < 10){
            temp = "0" + time_alt;
        }
        else{
            temp = time_alt;
        }
        return temp;
    },
  //fixed 0 pause bug by limiting pause funcitonality wrt time_diff  
    pause: function(){
         if(time_diff>1000){
            clearInterval(count);
            play.innerHTML = "Start";
        }
    },
    update : function(tick_text){
        ticker.innerHTML = tick_text;
    },

}




