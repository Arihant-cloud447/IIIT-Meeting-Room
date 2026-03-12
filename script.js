document.getElementById("bookingForm")
.addEventListener("submit", function(e){

e.preventDefault();

function convertTo24(hour, minute, ampm){

hour=parseInt(hour);

if(ampm==="PM" && hour!==12){
hour+=12;
}

if(ampm==="AM" && hour===12){
hour=0;
}

hour=hour.toString().padStart(2,'0');

return hour+":"+minute;
}

var name=document.getElementById("name").value;
var room=document.getElementById("room").value;
var date=document.getElementById("date").value;

var startTime=convertTo24(
document.getElementById("startHour").value,
document.getElementById("startMinute").value,
document.getElementById("startAMPM").value
);

var endTime=convertTo24(
document.getElementById("endHour").value,
document.getElementById("endMinute").value,
document.getElementById("endAMPM").value
);

var data={
name:name,
room:room,
date:date,
startTime:startTime,
endTime:endTime
};

fetch("https://script.google.com/macros/s/AKfycbydLitcIawctgs37zQ5Bbo1Kc2BiYbU30qD625twf__82uw14CUnQ8tHtQFnVBe2P0W/exec",{

method:"POST",
body:JSON.stringify(data)

})
.then(response=>response.text())
.then(function(result){

alert(result);

document.getElementById("bookingForm").reset();

})
.catch(function(error){

alert("Room already booked for this time slot");

console.log(error);

});

});