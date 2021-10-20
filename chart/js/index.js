google.charts.load('current');
google.charts.setOnLoadCallback(init);
var color1 = '';
var color2 = '';
var w = '';
var h = '';
var chartlevel = 5;
var chartstyle = true;
var chartspace = '';
var subchart = '';
var selectstate = '';
function init() {
    $(document).ready(function() {

        var JSON_data=JSON.parse( $("#json_data").val());

        color1 = $("#chartcolor1").val();
        color2 = $("#chartcolor2").val();
        w = $("#chartw").val();
        h = $("#charth").val();
        processSheetsData(JSON_data);
        chartlevel = $("#chartlevels").val();

        $("#btn_set_color").click(function() {
            color1 = $("#chartcolor1").val();
            color2 = $("#chartcolor2").val();
            for (var i = 1; i < 4; i++) {
                $("svg").remove();
            }
            processSheetsData(JSON_data);
            // query.send(processSheetsData);
        });

        $("#btn_set_size").click(function() {
            w = $("#chartw").val();
            h = $("#charth").val();
            $('.radar_chart_container1').css({
                "margin-left": w - 150
            });

            for (var i = 1; i < 4; i++) {
                $("svg").remove();
            }
            if (chartstyle == 'style4') {
                for (var i = 1; i < 5; i++) {
                    for (var j = 1; j < 5; j++) {
                        $("#chart" + i + "-" + j).css({
                            "width": w,
                            "height": h
                        });
                    }
                }
            }
            processSheetsData(JSON_data);
        });

        $("#btn_set_level").click(function() {
            chartlevel = $("#chartlevels").val();
            for (var i = 1; i < 4; i++) {
                $("svg").remove();
            }
            processSheetsData(JSON_data);
        });

        $("#chartstyle").change(function() {
            chartstyle = $("#chartstyle").val();
            if (chartstyle == 'style2') {
                chartstyle = false;
            } else if (chartstyle == 'style1') {
                chartstyle = true;
            } else if (chartstyle == 'style3') {
                chartstyle = 'style3';
            } else if (chartstyle == 'style4') {
                chartstyle = 'style4';
            } else if (chartstyle == 'style5') {
                chartstyle = 'style5';
            }

            $("svg").remove();
            $("img").remove();

            for (var i = 1; i < 5; i++) {
                for (var j = 1; j < 5; j++) {
                    $("#chart" + i + "-" + j + "-wrapper").remove();
                    $("#chart" + i + "-" + j).empty();
                }
            }
            processSheetsData(JSON_data);
        });

        $("#btn_set_space").click(function() {
            chartspace = $("#chartspace").val();
            if (chartstyle != '0') {
                $('.radar_chart_container1').css({
                    "margin-left": chartspace
                });
                $("svg").remove();
                processSheetsData(JSON_data);
            }
        });
    });
}

function processSheetsData(response) {
    
    var data=response;
    
    if (chartstyle == 'style5') {
        $('#btn_set_level').attr('disabled', 'disabled');
        $('#titesub').hide();
        for(var i = 0; i < Object.keys(response.data).length; i++){
            var title = '';
            var series_data = [];
            var labels_data = [];
            for(var j=0; j < Object.keys(response.data[i].value).length; j++){
                var value_data = [];
                for(var l=0; l < Object.keys(response.data[i].value[j].value).length; l++){
                    if(j==0)
                        labels_data.push(response.data[i].value[j].value[l].title);
                    value_data.push(parseFloat(response.data[i].value[j].value[l].value));
                }
                series_data.push({values: value_data})
            }
            title = response.data[i].title;


            $("#chart" + parseInt(i + 1) + "-" + parseInt(1)).css({
                "width": parseFloat(w) + 150,
                "height": parseFloat(h) + 150
            })
            
            var kstheme = {
                    "root": {
                        "background-color": "white",
                        "gui": {
                            "context-menu": {
                                "button": {
                                    "visible": false
                                },
                                "gear": {
                                    "visible": false
                                }
                            }
                        }
                    },
                    "palette": {
                        "radar": [
                            ["#ffffff", color1, "#40beeb", "#40beeb"],
                            ["#ffffff", color2, "#305f74", "#305f74"],
                        ],

                    },

                    "radar": {
                        "plot": {
                            "lineWidth": 1,
                            "marker": {
                                "visible": true
                            },
                            "animate": false,
                            "effect": 4,
                            "speed": 100,
                            "tooltip-text": "%v"
                        },
                        "scale-x": {
                            "markers": {
                                "backgroundColor": "#1bc9f2",
                                "lineColor": "#947850"
                            }
                        }
                    },
                };
            var myConfig = {
                "type": "radar",
                "plot": {
                    "aspect": "rose"
                }, 

                "scale-k": {
                    "labels": labels_data,
                    "item": {
                        "font-color": "black",
                        "font-family": "Georgia",
                        "font-size": 12,
                        "font-weight": "bold",
                        "font-style": "italic"
                    },
                    "tick": {
                        "line-color": "#9999",
                        "line-width": 3,
                        "size": 15,
                        "placement": "outer"
                    },
                    "guide": {
                        "line-color": "red",
                        "line-width": 1,
                        "line-style": "solid",
                        "background-color": "#f0f0f5 #e0e0eb"
                    }
                },
                "scale-v": {
                    "visible": true
                },

                "series":  series_data,
            };

            zingchart.render({
                id: 'chart' + parseInt(i + 1) + '-' + parseInt(1),
                data: myConfig,
                defaults: kstheme
            });
                $('.zc-img').hide();
                var f = 1;
                var modal = document.getElementById("subchartmodal");
                var span = document.getElementsByClassName("close")[0];
                
                $("tspan").hover(function(){
                    $(".modal-content").css({"transform": "translate(345px, 60px)"});
                    var tempvalue = $(this).text();


                    if( f==1){
                        $(this).css({"fill":"#6e6cff", "font-size":"13"});
                        f = 0;
                    }else{
                        $(this).css({"fill":"black", "font-size":"12"});
                        f = 1;
                    }
                    
                    if( selectstate != ''){
                        if(selectstate != tempvalue ){
                            $('#sub'+selectstate).hide();
                            $('#'+selectstate).hide();
                        }
                    }
                 
                    $('#'+tempvalue).show();
                    $('#sub'+tempvalue).show();
                    selectstate = tempvalue;  
                     window.onclick = function() {
                        $('#sub'+selectstate).hide();
                        $('#'+selectstate).hide();
                    }   
                });

               

            kstheme1 = [];
            myConfig = [];
        }
        subcreatedata(data);    
    
    } else if (chartstyle == 'style4') {
        $('#btn_set_color').attr('disabled', false);
        $('#btn_set_level').attr('disabled', 'disabled');
        $('#btn_set_size').attr('disabled', false);
        $('#titesub').show();
        for (var i = 1; i < 5; i++) {
            for (var j = 1; j < 5; j++) {
                $("#chart" + i + "-" + j + "-wrapper").remove();
                $("#chart" + i + "-" + j).empty();
            }
        }
            
        var subtitle = [];
        for(var i = 0; i < Object.keys(response.data).length; i++){
            var style4_data = [];
            var title = '';
            for(var j=0; j < Object.keys(response.data[i].value).length-1; j++){
                var data_value = []; 
                var temparray = [];
                for(var l=0; l < Object.keys(response.data[i].value[j].value).length; l++){
                    temparray.push(response.data[i].value[j].value[l].title);
                    data_value.push({
                                    category: response.data[i].value[j].value[l].title,
                                    value1: parseFloat(response.data[i].value[j].value[l].value),
                                    value2: parseFloat(response.data[i].value[j+1].value[l].value)
                                })
                }
                style4_data.push({data_value})
                subtitle = temparray;
            }
            title = response.data[i].title;

            // $("#chart" + parseInt(k + 1) + "-" + parseInt(p + 1) + "-wrapper").remove();
            radarchartstyle4(style4_data, i + 1, 1, subtitle);
        }
        subcreatedata(data);

    } else if (chartstyle == 'style3') {
        $('#titesub').css({"display":"none"});
        $('#btn_set_color').attr('disabled', false);
        $('#btn_set_level').attr('disabled', 'disabled');
        $('#btn_set_size').attr('disabled', false);
        $('#titesub').hide();    
        for (var i = 1; i < 5; i++) {
            for (var j = 1; j < 5; j++) {
                $("#chart" + i + "-" + j + "-wrapper").remove();
                $("#chart" + i + "-" + j).empty();
            }
        }
       
        var color_arry = [color1, color2];
        for(var i = 0; i < Object.keys(response.data).length; i++){
            var radar_data = [];
            var title = '';
            for(var j=0; j < Object.keys(response.data[i].value).length; j++){
                var axes = [];
                for(var l=0; l < Object.keys(response.data[i].value[j].value).length; l++){
                    axes.push({
                            name: response.data[i].value[j].value[l].title,
                            y: parseFloat(response.data[i].value[j].value[l].value)
                        })
                }
                radar_data.push({name:'Michael', defaultPoint_tooltip: '%yvalue',color: color_arry[j], points: axes})
            }
            $("#chart" + parseInt(i + 1) + "-" + parseInt(1) + "-wrapper").remove();
            radarchartstyle3(radar_data, i + 1, 1);
        }
        subcreatedata(data, '');  

    } else if (chartstyle != 'style5' || chartstyle != 'style4' || chartstyle != 'style3') {

        $('#btn_set_color').attr('disabled', false);
        $('#btn_set_level').attr('disabled', false);
        $('#btn_set_size').attr('disabled', false);
        $('#titesub').hide();
        for(var i = 0; i < Object.keys(response.data).length; i++){
            var radar_data = [];
            var title = '';
            for(var j=0; j < Object.keys(response.data[i].value).length; j++){
                var axes = [];
                for(var l=0; l < Object.keys(response.data[i].value[j].value).length; l++){
                    axes.push({
                            axis: response.data[i].value[j].value[l].title,
                            value: response.data[i].value[j].value[l].value
                        })
                }
                radar_data.push({name: response.data[i].value[j].title, axes})

            }
            title = response.data[i].title;
            radarchart(radar_data, i + 1,  1, title);
        }
        subcreatedata(data);
    }
   
}

function subcreatedata(response, subtitle){
    for(var q = 0; q < Object.keys(response.data).length; q++){
        for(var w=0; w < Object.keys(response.data[q].sub_value).length; w++){
            var radar_sub_data = [];
            for(var e=0; e < Object.keys(response.data[q].sub_value[w].value).length; e++){
                var axes = [];
                for(var r=0; r < Object.keys(response.data[q].sub_value[w].value[e].value).length; r++ ){
                    axes.push({
                        axis: response.data[q].sub_value[w].value[e].value[r].title,
                        value: response.data[q].sub_value[w].value[e].value[r].value
                    })
                }
                radar_sub_data.push({name: response.data[q].sub_value[w].title, axes})
            }
            var title = response.data[q].sub_value[w].title;
            radarsubchart(radar_sub_data, title, w, subtitle);
        }
    }
}

function radarchart(data, col_id, row_id, title) {
    $("#title"+parseInt(col_id)+"-1" ).text(title);
    var margin = { top: 50, right: 80, bottom: 50, left: 80 },
        width = Math.min(700, window.innerWidth / 4) - margin.left - margin.right,
        height = Math.min(width, window.innerHeight - margin.top - margin.bottom);

    var radarChartOptions = {
        w: parseInt(w),
        h: parseInt(h),
        margin: margin,
        levels: parseInt(chartlevel),
        roundStrokes: chartstyle,
        color: d3.scaleOrdinal().range([color1, color2]),
        format: '.003'
    };
    subchart = "";
    var total = 1;
    let svg_radar = RadarChart("#chart" + col_id + "-" + row_id, data, radarChartOptions, chartstyle, subchart, total);
    
    var f = 1;
    var modal = document.getElementById("subchartmodal");
    var span = document.getElementsByClassName("close")[0];
    
    $("tspan").hover(function(){
        $(".modal-content").css({"transform": "translate(355px, 10px)"});
        $(".subchartmodal").css({"margin-top": "30px"});
        $(".modal-content").css({"margin-top": "30px"});

        var tempvalue = $(this).text();
        if( f==1){
            $(this).css({"fill":"#6e6cff", "font-size":"12"});
            f = 0;
        }else{
            $(this).css({"fill":"black", "font-size":"11"});
            f = 1;
        }
        
        if( selectstate != ''){
            if(selectstate != tempvalue ){
                $('#sub'+selectstate).hide();
                $('#'+selectstate).hide();
            }
        }
     
        $('#'+tempvalue).show();
        $('#sub'+tempvalue).show();
        selectstate = tempvalue;  

        window.onclick = function() {
            $('#sub'+selectstate).hide();
            $('#'+selectstate).hide();
        }
    });   
}

function radarsubchart(data, title, col_id) {
    var total = 0;
    for(var i=0; i < Object.keys(data).length; i++){
        total = Object.keys(data[i].axes).length;
    }
  
    var html = '<div id="sub'+title+'" style="font-size:35px; font-weight:700; color:#999999; transform: translate(-230px, 200px);" hidden>'+ title +'</div>'
              +'<div id='+title+' style="font-weight:600" hidden></div>'

    $("#subdrillchart").append(html);

    subchart = "subchart";
    $("#title"+parseInt(col_id+1) ).text(title);

    var margin = { top: 50, right: 80, bottom: 50, left: 80 },
        width = Math.min(700, window.innerWidth / 4) - margin.left - margin.right,
        height = Math.min(width, window.innerHeight - margin.top - margin.bottom);

    var radarChartsubOptions = {
        w: 200,
        h: 250,
        margin: margin,
        levels: parseInt(chartlevel),
        roundStrokes: false,
        color: d3.scaleOrdinal().range([color1, color2]),
        format: '.003'
    };

    let svg_radar = RadarChart("#"+title , data, radarChartsubOptions, false, subchart, total);

    // $('tspan').css({"background-color":"lightblue","width":"20px","overflow-x":"visible"});
}

function radarchartstyle4(data, col_id, row_id, subtitle) {

    $("#chart" + col_id + "-" + row_id).css({
        "width": parseFloat(w) + 100,
        "height": parseFloat(h) + 100
    });
    var html = '';
    if(col_id == 1){
        html = '<div style="margin-top:-30px; margin-left:30px; z-index:12121">';
    }else{
        html = '<div style="margin-top:-30px; margin-left:150px; z-index:12121">';
    }
    for(var i=0; i < Object.keys(subtitle).length; i++){
        html += '<label style="margin-left:10px">'+subtitle[i]+'</label>'
    }
    html += '</div>'
    $('#titesub').append(html);

    
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chart" + col_id + "-" + row_id, am4charts.RadarChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data=data[0].data_value;

    chart.padding(20, 20, 20, 20);

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.tooltipLocation = 0.5;
    categoryAxis.renderer.cellStartLocation = 0.2;
    categoryAxis.renderer.cellEndLocation = 0.8;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.horizontalCenter = "left";
    valueAxis.min = 0;

    var series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.columns.template.tooltipText = "{name}: {valueY.value}";
    series1.columns.template.width = am4core.percent(100);
    series1.name = "Acquiree";
    series1.dataFields.categoryX = "category";
    series1.dataFields.valueY = "value1";
    series1.fill = am4core.color(color1);
    series1.stroke = am4core.color(color1);

    var series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.columns.template.width = am4core.percent(100);
    series2.columns.template.tooltipText = "{name}: {valueY.value}";
    series2.name = "Acquirer";
    series2.dataFields.categoryX = "category";
    series2.dataFields.valueY = "value2";
    series2.fill = am4core.color(color2);
    series2.stroke = am4core.color(color2);
    $('title').parent().remove();
    
    var f = 1;
    var modal = document.getElementById("subchartmodal");
    $("label").hover(function(){
        $(".modal-content").css({"transform": "translate(325px, 10px)"});
        var tempvalue = $(this).text();
        if( f==1){
            $(this).css({"color":"#6e6cff", "font-size":"13"});
            f = 0;
        }else{
            $(this).css({"color":"black", "font-size":"12"});
            f = 1;
        }
        
        if( selectstate != ''){
            if(selectstate != tempvalue ){
                $('#sub'+selectstate).hide();
                $('#'+selectstate).hide();
            }
        }
     
        $('#'+tempvalue).show();
        $('#sub'+tempvalue).show();
        selectstate = tempvalue;     
        window.onclick = function() {
            $('#sub'+selectstate).hide();
            $('#'+selectstate).hide();
        }
    });   

}

function radarchartstyle3(data, col_id, row_id) {

    $("#chart" + col_id + "-" + row_id).css({
        "width": parseFloat(w) + 170,
        "height": parseFloat(h) + 170
    });

    var chart = JSC.chart("chart" + col_id + "-" + row_id, {
        // debug: true,
        type: 'radar polar line',
        legend_visible: false,
        yAxis: {
            markers: [{
                value: [23, 34],
                color: 'white',
                opacity: 0.4
            }],
            defaultTick_gridLine_color: '#e4e4e4',
            alternateGridFill: '#f5f5f5',
        },
        series: data
    });

    var f = 1;
    var modal = document.getElementById("subchartmodal");
    var span = document.getElementsByClassName("close")[0];
    $("#subchartmodal").css({"margin-top":"50px"});
    $("tspan").hover(function(){
        $(".modal-content").css({"transform": "translate(355px, 10px)"});
        var tempvalue = $(this).text();
        if( f==1){
            $(this).css({"fill":"#6e6cff","font-size":"13"});
            f = 0;
        }else{
            $(this).css({"fill":"rgb(95, 95, 95)","font-size":"12"});
            f = 1;
        }
        if( selectstate != ''){
            if(selectstate != tempvalue ){
                $('#sub'+selectstate).hide();
                $('#'+selectstate).hide();
            }
        }
     
        $('#'+tempvalue).show();
        $('#sub'+tempvalue).show();
        selectstate = tempvalue;     
        window.onclick = function() {
            $('#sub'+selectstate).hide();
            $('#'+selectstate).hide();
        }
    });

    
}

