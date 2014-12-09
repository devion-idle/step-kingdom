var dailySteps = 0;
var userId = null;

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

function getSteps(result) {
    result.get("/1/user/" + userId + "/activities/date/" + today() + ".json")
        .done(function (response) {
            dailySteps = response.summary.steps;
            $("#dailySteps").text(dailySteps);
        })
        .fail(function (err) {
            // TODO: Handle failure to get step count
        });
}

OAuth.initialize('R_b1DUSdIvkFS5Go8Zp3caHxOmE');
OAuth.popup('fitbit')
    .done(function(result) {
        console.log("Successfully connected to Fitbit.");

        // Get username and ID
        result.get("/1/user/-/profile.json")
            .done(function(response) {
                userId = response.user.encodedId;
                $("#username").text(response.user.displayName);

                // Get step count
                getSteps(result)

                // Set 5 minute refresh on step count
                setInterval(function() { getSteps(result) }, 300000);
            })
            .fail(function(err) {
               // TODO: Handle failure to get username
            });
    })
    .fail(function(err) {
        console.log("Failed to connect to Fitbit.");
    });