var dailySteps = 0;

// Get today's date in YYYY-MM-DD format
function today() {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    return yyyy + '-' + mm + '-' + dd;
}

OAuth.initialize('R_b1DUSdIvkFS5Go8Zp3caHxOmE');
OAuth.popup('fitbit')
    .done(function(result) {
        console.log("Successfully connected to Fitbit.");
        result.get("/1/user/-/activities/date/" + today() + ".json")
            .done(function(response)  {
                dailySteps = response.summary.steps;
                $("#dailySteps").text(dailySteps)
            });
    })
    .fail(function(err) {
        console.log("Failed to connect to Fitbit.");
    });