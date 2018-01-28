


var config = {
    apiKey: "AIzaSyD4xogqOGpm49alPlX5Ubb-CEd9Z1nBbMQ",
    authDomain: "trainschedule-fd5ca.firebaseapp.com",
    databaseURL: "https://trainschedule-fd5ca.firebaseio.com",
    projectId: "trainschedule-fd5ca",
    storageBucket: "",
    messagingSenderId: "825379444504"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function() { 

$("#add-train-button").on("click", function(event){
	event.preventDefault();

	var trainName = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var firstTrain = $("#first-train-input").val().trim();
	var frequency = $("#frequency-input").val().trim();

	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
		});

	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-train-input").val("");
	$("#frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot){

	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var frequency = childSnapshot.val().frequency;

	var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	var currentTime = moment();

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("difference in time: " + diffTime);

	var tRemainder = diffTime % frequency;
	console.log(tRemainder);

	var minutesTillTrain = frequency - tRemainder;
	console.log("minutes till train: " + minutesTillTrain);

	var nextTrain = moment().add(minutesTillTrain, "minutes");
	console.log("arrival time: " + moment(nextTrain).format("hh:mm"));

	$("tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + 
		"</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + minutesTillTrain + "</td></tr>");
});

});