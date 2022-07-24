function callJsonApi(series, graphUrl){
    $.getJSON(graphUrl, function (data) {
        series.setData(data);
    });
}

function openTab(event, tabname) {
      var i, tabcontent, tablinks;

      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 1; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(tabname).style.display = "block";
      event.currentTarget.className += " active";
}

function createChart(chart_type, graphUrl){
    var existingSeries = chart.pw.entries().next().value;
    if (existingSeries){
        chart.removeSeries(existingSeries[0]);
    }
    if (chart_type == 'candlestick') {
        const candleSeries = chart.addCandlestickSeries({
              upColor: '#008000',
              downColor: '#af111c',
              borderVisible: false,
              wickVisible: true,
              borderColor: '#000000',
              wickColor: '#000000',
              borderUpColor: '#008000',
              borderDownColor: '#af111c',
              wickUpColor: "#008000",
              wickDownColor: "#af111c",
        });
        
        callJsonApi(candleSeries, graphUrl);
        return candleSeries;

    }

    else if (chart_type == 'line'){
        const lineSeries = chart.addLineSeries({
            color: '#f48fb1',
            lineStyle: 0,
            lineWidth: 1,
            crosshairMarkerVisible: true,
            crosshairMarkerRadius: 6,
            crosshairMarkerBorderColor: '#ffffff',
            crosshairMarkerBackgroundColor: '#2296f3',
            lineType: 0,
            lastPriceAnimation: LightweightCharts.LastPriceAnimationMode.Continuous,
        });
        callJsonApi(lineSeries, graphUrl);
        return lineSeries;

    }

}

function updateChart(series){
    const chartSocket = new WebSocket("ws://localhost:8001/ws/realtime-cmp/");
    chartSocket.onmessage = function(e){
        var data = JSON.parse(e.data);
        var chartData = {'time':  date.timestamp, 'value': data.cmp};
        series.update(chartData);
    }

}

const chart = LightweightCharts.createChart(document.getElementById('stock_chart'), { width: 1450, height: 600 });
chart.applyOptions({
    timeScale: {
        rightOffset: 5,
        barSpacing: 25,
        fixLeftEdge: false,
        lockVisibleTimeRangeOnResize: false,
        rightBarStaysOnScroll: false,
        borderVisible: false,
        borderColor: '#fff000',
        visible: true,
        timeVisible: true,
        secondsVisible: true,
        tickMarkFormatter: (time, tickMarkType, locale) => {
            var dateObj = new Date(time * 1000);
            var options = {year: 'numeric', month: 'short', day: 'numeric'};
            return dateObj.toLocaleDateString('en-US', options);
        },
    },
    crosshair: {
        vertLine: {
            color: '#6A5ACD',
            width: 0.5,
            style: 1,
            visible: true,
            labelVisible: true,
        },
        horzLine: {
            color: '#6A5ACD',
            width: 0.5,
            style: 0,
            visible: true,
            labelVisible: true,
        },
        mode: 0,
    },
});

$(document).ready(function () {
    var chartUrl = '/market/company-cmp-record/chart_type/company_id/';
    var chartType = $("#id_chart_type").val();
    var stock = $("#id_stock").val();
    var url = chartUrl.replace('chart_type', chartType).replace('company_id', stock);
    var series = createChart(chartType, url); 
    $('.stockchartform').on('click', function() {
        var chartUrl = '/market/company-cmp-record/chart_type/company_id/';
        var chartType = $("#id_chart_type").val();
        var stock = $("#id_stock").val();
        var url = chartUrl.replace('chart_type', chartType).replace('company_id', stock);
        var series = createChart(chartType, url); 
        updateChart(series);
    });
    $(".footer-custom").addClass('d-none');
});
