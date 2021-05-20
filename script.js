
var calendar = $(".container");
var currentDate = moment().format("MMMM D, YYYY");
var dailyTasks = [];
var taskObject = {
	timeSlot: "", 
	task: ""
};

function renderDay(){
	$("#currentDay").text(currentDate);
	for(var i=9; i<18; i++){
		var timeRow = $("<div>").attr({"class": "row"});
		var amPm; 
		var timeOfDay = i;

		if(i > 11){
			amPm = "PM"; 
		}else{
			amPm = "AM";
		}
		if(i > 12){
			timeOfDay = i - 12;
		}

		var inptArea = $("<div>").attr({"class": "inpt-area mb-3", "id":`${i}`});
		var timeSpot = $("<div>").attr({"class": "col-md-1"}).text(`${timeOfDay} ${amPm}`);
		var textArea = $("<input>").attr({"class": "form-control col-md-10", "type": "text", "id":`input${i}`});
		var inptArea2 = $("<div>").attr({"class": "inpt-area-append"});
		var submitBtn = $("<button>").attr({"class": "btn btn-info", "type": "button"}).text("Submit");

		inptArea.append(timeSpot,textArea,inptArea2,submitBtn);
		calendar.append(inptArea);
	}
};

function saveData(){
	taskObject.timeSlot = $(this).parent().attr("id");
	taskObject.task = $(`#input${taskObject.timeSlot}`).val();

	if(localStorage.getItem(`${currentDate}`) === null){
	 	dailyTasks.push(taskObject);
	 	localStorage.setItem(currentDate, JSON.stringify(dailyTasks));
	}else{
		dailyTasks = JSON.parse(localStorage.getItem(`${currentDate}`))
		dailyTasks.push(taskObject);
		localStorage.setItem(currentDate, JSON.stringify(dailyTasks));
	}
}

function loadData(){
	if(localStorage.getItem(`${currentDate}`) !== null){
		var data = JSON.parse(localStorage.getItem(`${currentDate}`));

		data.forEach(datum => {
			$(`#input${datum.timeSlot}`).val(datum.task);
		})
	}
}; 

function colorTasks(){
	var hour =  moment().format("HH"); 
	$(".col-md-10").each(function(){
		var taskHour = parseInt($(this).attr("id").substring(5));
		if(taskHour < hour){
			$(this).css({"background-color": "#778899", "color": "white"});
		}else if(taskHour > hour){
			$(this).css({"background-color": "#CD5C5C", "color": "white"});
		}else{
			$(this).css({"background-color": "#90EE90", "color": "white"});
		}
	})
}

$(document).ready(function() {
	$("button").on("click", saveData);
});

renderDay();
loadData();
colorTasks();