var request = require('request');

exports.handler = function(event, context) {
	// Build Kintera URL	
	var event_id = 1134181;
	var sup_id = event.params.id;
	var url = 'http://kintera.org/gadgets/data/thermometer.aspx?eid=' + event_id + '&sid=' + sup_id;
	console.log(url);

	/**
		Call Kintera Page
	**/
	request(url, function(err, res, body) {
		var results = {};
		cond:
			if (!err && res.statusCode == 200) {
				var params = body.split("&");

				// Check for error message
				if (params.length > 2) {
					results["error_msg"] = "The Event ID or Supporter ID are not valid.";
					console.log("The Event ID or Supporter ID are not valid.");
					break cond;
				}

				// Iterate through parameters
				for (var i = 0; i < params.length; i++) {
					var split_params = params[i].split("=");
					results[split_params[0]] = Number(split_params[1]);
					console.log(results[split_params[0]] = Number(split_params[1]));
				}
			} else {
				console.log("Error making the request");
				results["error_msg"] = "There was an error making the request";
			}

		context.succeed(results);
	});
}
