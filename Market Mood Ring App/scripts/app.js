(function (global) {
    var app = global.app = global.app || {};
	var productId = "aebf964af86c4263a116dd5d8a762bcb";
	var analytics = app.analytics = app.analytics || {};
  
    analytics.start = function()
    {
    	var factory = window.plugins.EqatecAnalytics.Factory;
    	var monitor = window.plugins.EqatecAnalytics.Monitor;
    	var settings = factory.CreateSettings(productId);
    
        settings.LoggingInterface = factory.CreateTraceLogger();
    	factory.CreateMonitorWithSettings(settings,
      		function() {
        		console.log("Monitor created");
        		
                monitor.Start(function() {
          			console.log("Monitor started");
        		});
      		},
      		function(msg) {
        		console.log("Error creating monitor: " + msg);
      	});
  	}
	
    analytics.stop = function()
  	{
    	var monitor = window.plugins.EqatecAnalytics.Monitor;
    	monitor.Stop();
  	}
  
    analytics.monitor = function()
  	{
    	return window.plugins.EqatecAnalytics.Monitor;
  	}
    
    document.addEventListener('deviceready', function () {
        
        navigator.splashscreen.hide();
        analytics.start();
        analytics.monitor().TrackExceptionMessage(null, "My context message");

        app.application = new kendo.mobile.Application(document.body);
        
        function createChart() {
            var chart = $("#chart").kendoChart({
                theme: "flat",
                title: {
                    position: "bottom",
                    text: "Chance the Heat have of beating the Spurs"
                },
                legend: {
                    visible: false
                },
                chartArea: {
                    background: ""
                },
                seriesDefaults: {
                    labels: {
                        visible: true,
                        background: "transparent",
                        template: "#= category #"
                    }
                },
                series: [{
                    type: "pie",
                    startAngle: 150,
                    data: [{
                        category: "Spurs",
                        value: 99.8
                    },{
                        category: "Heat",
                        value: 0.2
                    }]
                }],
                tooltip: {
                    visible: true,
                    format: "{0}%"
                }
            }).data("kendoChart");
            
            chart.refresh();
            alalytics.monitor().TrackFeature("Create Chart");
        }

        createChart();
    }, false);
})(window);