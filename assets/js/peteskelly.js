// code specific to peteskelly.com

// Load community events from Azure Function 
function loadCommunityEvents() {
    $.ajax({
    type: "GET",
    url: "https://prod-pasblogfunctions.azurewebsites.net/api/Events?code=I3tOA5bdtZksGJNYEngwM5KCfE/q1MsOGrWiat4PFWopQD5NuGgt9w==",
    dataType: "json",
    }).success( function( data ) {
        console.log(data);
        insertCommunityEvent(data);
    }).error(function(){
        insertCommunityEvent(null);
    });
}

function insertCommunityEvent(eventData) {
       var eventInfo = '';
        //start building li's for upcoming events, only display 5 or less
       if(eventData !== null && eventData.length > 0) {
            var i = 0;
            var maxEvents = eventData.length <= 5 ? eventData.length : 5;     
            do {
                eventInfo += "<li><a href='" + eventData[i].link + "'>" + eventData[i].name + "</a></li>"
                i++;
            }
            while (i < maxEvents);
        } else {
            //if no upcoming events            
            eventInfo += "<li>No upcoming events.</li>"
        }
        //Append the html of the comunity sidebar
        $('#communitySideBar').append(eventInfo);
}