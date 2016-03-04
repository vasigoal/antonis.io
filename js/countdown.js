(function($) {
	$.fn.countdown = function(options, callback) {
		//custom 'this' selector
		thisEl = $(this);
		//array of custom settings
		var settings = { 
			'date': $.now(),
			'format': 'off'
		};
		//append the settings array to options
		if(options) {
			$.extend(settings, options);
		}
		//main countdown function
		function countdown_proc() {
			eventDate = Date.parse('Nov 17, 1983') / 1000;
			currentDate = Math.floor($.now() / 1000);
			if(eventDate >= currentDate) {
				callback.call(this);
				clearInterval(interval);
			}
			seconds = currentDate - eventDate;
			years = Math.floor(seconds / (60 * 60 * 24 * 365)); //calculate the number of days
			seconds -= years * 60 * 60 * 24 * 365; //update the seconds variable with no. of days removed
			days = Math.floor(seconds / (60 * 60 * 24));
			seconds -= days * 60 * 60 * 24; //update the seconds variable with no. of hours removed
			hours = Math.floor(seconds / (60 * 60));
			seconds -= hours * 60 * 60; //update the seconds variable with no. of minutes removed
			minutes = Math.floor(seconds / 60);

			//conditional Ss
			if (years == 1) { thisEl.find(".timeRefDays").text("year"); } else { thisEl.find(".timeRefDays").text("years"); }
			if (days == 1) { thisEl.find(".timeRefHours").text("day"); } else { thisEl.find(".timeRefHours").text("days"); }
			if (hours == 1) { thisEl.find(".timeRefMinutes").text("hour"); } else { thisEl.find(".timeRefMinutes").text("hours"); }
			if (minutes == 1) { thisEl.find(".timeRefSeconds").text("minute"); } else { thisEl.find(".timeRefSeconds").text("minutes"); }
			if (seconds == 1) { thisEl.find(".timeRefSeconds").text("second"); } else { thisEl.find(".timeRefSeconds").text("seconds"); }
			//logic for the two_digits ON setting
			if(options['format'] == "on") {
				years = (String(years).length >= 2) ? years : "0" + years;
				days = (String(days).length >= 2) ? days : "0" + days;
				hours = (String(hours).length >= 2) ? hours : "0" + hours;
				minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
				seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
			}
			//update the countdown's html values.
			if(!isNaN(eventDate)) {
				thisEl.find(".years").text(years);
				thisEl.find(".days").text(days);
				thisEl.find(".hours").text(hours);
				thisEl.find(".minutes").text(minutes);
				thisEl.find(".seconds").text(seconds);
			} else { 
				alert("Invalid date. Here's an example: 12 Tuesday 2012 17:30:00");
				clearInterval(interval); 
			}
		}
		//run the function
		countdown_proc();
		//loop the function
		interval = setInterval(countdown_proc, 1000);
	}
}) (jQuery);