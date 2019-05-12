//Set up the outside div containers for each row
var div1 = document.createElement("div");
div1.setAttribute("class", "row");
div1.setAttribute("id", "firstRow");
var div2 = document.createElement("div");
div2.setAttribute("class", "row");
div2.setAttribute("id", "secondRow");
var div3 = document.createElement("div");
div3.setAttribute("class", "row");
div3.setAttribute("id", "thirdRow");
var div4 = document.createElement("div");
div4.setAttribute("class", "row");
div4.setAttribute("id", "fourthRow");
var div5 = document.createElement("div");
div5.setAttribute("class", "row");
div5.setAttribute("id", "fifthRow");
var div6 = document.createElement("div");
div6.setAttribute("class", "row");
div6.setAttribute("id", "sixthRow");

var divArr = [div1, div2, div3, div4, div5, div6];

//make reference to the outside "col" border so we can append things to it.
var border = document.getElementById("outborder");
border.appendChild(div1);
border.appendChild(div2);
border.appendChild(div3);
border.appendChild(div4);
border.appendChild(div5);
border.appendChild(div6);

var startDate = new Date("January 1, 2010 00:00:00");
var currentDate = new Date();
var currentCalendar = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0); //need to set this one based on viewed calendar.
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//Set the current month based on the currentDate
var header = document.getElementById("header-text");
header.innerHTML = months[currentDate.getMonth()] + " " + currentDate.getFullYear();
var firstDay = currentCalendar.getDay();
var storeMonth = currentCalendar.getMonth();
var storeDate = currentCalendar.getDate();

var currentDay = currentDate.getDate();

currentCalendar.setMonth((currentCalendar.getMonth() + 1) % 12);
currentCalendar.setDate(0);

var lastDay = currentCalendar.getDate();
currentCalendar.setMonth(storeMonth);
currentCalendar.setDate(storeDate);

var startCalendar = new Date(currentCalendar.getFullYear(), currentCalendar.getMonth(), 1 - firstDay, 0, 0, 0, 0);
var endCalendar = new Date(currentCalendar.getFullYear(), currentCalendar.getMonth(), 0, 0, 0, 0, 0);

var currNumber = startCalendar.getDate();
var finalDay = endCalendar.getDate();
var counter = currNumber;
var panelArr = [[], []]; //2d array
var x = -1;
//The reason we check > 0 is because if it's > 0 then the Date() object above will return the previous month.
var notCurrentMonth = (firstDay > 0);
for (i = 0; i < 35; i++) {
    var outerDiv = document.createElement("div");
    //Catch with this check BEFORE we execute anything else to ensure we are
    // changing before elements are drawn and before counter increments
    if (currNumber % finalDay == 1) {
        notCurrentMonth = !notCurrentMonth; //every time we enter here, flip the boolean value.
        console.log(notCurrentMonth);
    }
    //The first of each row
    if (i % 7 == 0) {
        //Add green background if this is today's date
        if (counter == currentDay) {
            outerDiv.setAttribute("class", "col border-no-top border-left-thin border-color-black outerpanel bg-lightgreen");
        }
        else if (notCurrentMonth) {
            outerDiv.setAttribute("class", "col border-no-top border-left-thin border-color-black outerpanel bg-darkgray");
        }
        else {
            outerDiv.setAttribute("class", "col border-no-top border-left-thin border-color-black outerpanel");
        }
    }
    //the last panel all the way to the right
    else if (i % 7 == 6) {
        if (counter == currentDay) {
            outerDiv.setAttribute("class", "col border-no-top border-right-thin border-color-black outerpanel bg-lightgreen");
        }
        else if (notCurrentMonth) {
            outerDiv.setAttribute("class", "col border-no-top border-right-thin border-color-black outerpanel bg-darkgray");
        }
        else {
            outerDiv.setAttribute("class", "col border-no-top border-right-thin border-color-black outerpanel");
        }
    }
    //all center panels
    else {
        if (counter == currentDay) {
            outerDiv.setAttribute("class", "col border-no-top border-color-black outerpanel bg-lightgreen");
        }
        else if (notCurrentMonth) {
            outerDiv.setAttribute("class", "col border-no-top border-color-black outerpanel bg-darkgray");
        }
        else {
            outerDiv.setAttribute("class", "col border-no-top border-color-black outerpanel");
        }
    }
    outerDiv.setAttribute("id", "node" + currNumber);
    var panelDiv = document.createElement("div");
    panelDiv.setAttribute("class", "panel panel-default");
    var innerPanel = document.createElement("div");
    innerPanel.setAttribute("class", "panel-body text-center margin-center-top");
    innerPanel.innerText = counter;
    panelDiv.appendChild(innerPanel);
    outerDiv.appendChild(panelDiv);
    //To write each row with 7 days before jumping to the next row
    if (i % 7 == 0) {
        x += 1;
    }
    divArr[x].appendChild(outerDiv);
    //If we've reached the end of the previous month then we start over for this current month.
    if (currNumber % finalDay == 1) {
        finalDay = lastDay;
        currNumber = 1;
    }
    counter = (currNumber % finalDay) + 1;
    currNumber += 1;
}

/**
 *  Event Handling for Calendar
 */
$("#calendarEvent").modal({show: false});

//When mouse is over a tile we scale it up and change background color, otherwise we change it back to normal.
$(".outerpanel").hover(
    //mouse enters div
    function() {
        $(this).addClass("scale-quarter");
    },
    //mouse exits div
    function() {
        $(this).removeClass("scale-quarter");
    }
);

$(".outerpanel").click(function() {
    console.log("You've clicked me.");
    //Show modal display box
    //Modify header of modal for the current date
    $('#calmodalHeader').text("Events for " + months[currentCalendar.getMonth()] + " " + $(this).text());
    $('#calendarEvent').modal('show');
});

