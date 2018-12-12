window.onload = checking_checks

var goal_check = document.querySelectorAll("#goal");
var check = document.querySelectorAll("input[type=checkbox]");
var play = document.getElementById("play_butt");
var session_count = 0 ;
var x = 0;
var z = 0;
var name = "";


//Tracker for breaks and work
function count(){
    session_count += 1;}


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


//On Click starts CountDown
play.addEventListener('click', function(){
    z++;
    countdown();})


//Basic Timer 
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
                         
    function hms (){
    var hours = addZero(Math.floor((time_diff%(1000*60*60*24))/(1000*60*60)));
    var minutes = addZero(Math.floor((time_diff%(1000*60*60))/(1000*60)));
    var seconds = addZero(Math.floor((time_diff%(1000*60))/1000));
    }
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
    
    if (time_diff <= 0){
        hours = '00';
        minutes = '00';
        seconds = '00';
        clearInterval(time);
        count()};
    //need to keep track of set count to switch to s_break or l_break
     document.getElementById("timer").innerHTML =  hours + " : " + minutes + " : " + seconds;                  
})}




