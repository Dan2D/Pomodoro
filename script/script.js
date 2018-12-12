window.onload = checking_checks

var goal_check = document.querySelectorAll("#goal");
var check = document.querySelectorAll("input[type=checkbox]")
var play = document.getElementById("play_butt")
var session_count = 0 

function count(){
    session_count += 1;
}

play.addEventListener('click', function(){
    countdown()
})


//While the check box is unchecked use first goal that is unchecked
function goals_loop(){
    for (i=0; i < 5; i++) {
        if (check[i].checked == false){
            goal_check = goal_check[i].value;
        break;}}
    //placeholder for now, want to change to break when session length ends
        if (goal_check == undefined){
            goal_check = "Break"}
    document.getElementById("session").innerHTML = goal_check;}

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





//Basic Timer 
function countdown(){
    
    for (i=0; i < 5; i++) {
        if (check[i].checked == false){
            goal_check = goal_check[i].value;
        break;}}
    //*****placeholder for now, want to change to break when session length ends*****
        if (goal_check == ""){
            goal_check = "Break";}
    document.getElementById("session").innerHTML = goal_check;         
                       
                       
    //Get timer for session first when play button is hit
    //Have to set it outside interval timer
    var session_length = document.querySelectorAll('.time_adjust')
    //var session_length = session_length_check[0].value
    //alert(session_length)
    var countdown_time = new Date().getTime() + (session_length[0].value*1000*60);
    
    
    //document.getElementById("timer").innerHTML = 
        
    
var time = setInterval(function(){
    var current_time = new Date().getTime();
    //alert(countdown_time + "    " + current_time);
    var time_diff = countdown_time - current_time;
    var hours = addZero(Math.floor((time_diff%(1000*60*60*24))/(1000*60*60)));
    var minutes = addZero(Math.floor((time_diff%(1000*60*60))/(1000*60)));
    var seconds = addZero(Math.floor((time_diff%(1000*60))/1000));

    function addZero(i) {
    if (i < 10) {
        i = "0" + i;}
    return i;}
    
        if (time_diff <= 0){
            hours = '00';
            minutes = '00';
            seconds = '00';
            clearInterval(time)}
    //need to keep track of set count to switch to s_break or l_break
     document.getElementById("timer").innerHTML =  hours + " : " + minutes + " : " + seconds;                  
})}




