// code specific to peteskelly.com

// Load community events from Azure Function 
function loadCommunityEvents() {
    $.ajax({
    type: "GET",
    url: "https://prod-pasblogfunctions.azurewebsites.net/api/getEvents?code=AkXBY/m6LAJ0P75QdWPxND1VNI9ePFqNwxcX4N3nQNWMIUuadYSE/g==",
    dataType: "json",
    }).success( function( data ) {
        console.log(data);
        insertCommunityEvent(data);
    }).error(function(){
        insertCommunityEvent(null);
    });
}

function loadPodcasts() {
    $.ajax({
    type: "GET",
    url: "https://prod-pasblogfunctions.azurewebsites.net/api/getPodcasts?code=MXc69hp9xie5QjP9LBd2/HADQiIYYj76KS8VMMHxrsxNgIcWqIZqcA==",
    dataType: "json",
    }).success( function( data ) {
        console.log(data);
        insertPodcasts(data);
    }).error(function(){
        insertPodcasts(null);
    });
}

function insertCommunityEvent(eventData) {
       var eventInfo = '';
        //start building li's for upcoming events, only display 5 or less
       if(eventData !== null && eventData.length > 0) {
            var i = 0;
            var maxEvents = eventData.length <= 5 ? eventData.length : 5;     
            do {
                eventInfo += "<li><a href='" + eventData[i].link + "'>" + eventData[i].name + "</a></li>";
                i++;
            }
            while (i < maxEvents);
        } else {
            //if no upcoming events            
            eventInfo += "<li>No upcoming events.</li>";
        }
        //Append the html of the comunity sidebar
        $('#communitySideBar').append(eventInfo);
}

function insertPodcasts(podcastData) {
    var podcasts = '';
    if(podcastData !== null && podcastData.length > 0) {
         var i = 0;
         var podcastMax = podcastData.length <= 10 ? podcastData.length : 10;     
         do {
             podcasts += "<li><a href='" + podcastData[i].Url + "'>" + podcastData[i].Name + "</a></li>";
             i++;
         }
         while (i < podcastMax);
     } else {
         //if no upcoming events            
         podcasts += "<li>No podcasts.</li>";
     }
     $('#podcastSideBar').append(podcasts);
}