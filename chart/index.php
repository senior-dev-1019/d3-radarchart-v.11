

<html>
   <link rel="stylesheet" type="text/css" href="./index.css">
   <script src="js/loader.js"></script>
   <script src="js/d3.v5.min.js"></script>
   <script src="js/jquery-3.4.1.slim.min.js"></script>
   <script src="js/jscharting.js"></script>
   <script src="js/types.js"></script>
   <script src="js/radarchart.js"></script>
   <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
   <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
   <script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
   <script src="https://cdn.amcharts.com/lib/4/themes/dataviz.js"></script>
   <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
   
   <body>
      <div class="navbar">
         <div style="width: 100%; display: flex;">
            <div style="width: 350px; text-align: center; display:flex;">
               <div>
                  <div>
                     <label>Acquiree : </label>
                     <input type="text" id="chartcolor1" placeholder="Input Acquiree Color" value="#FF80B0" />
                  </div>
                  <div>
                     <label>Acquirer : </label>
                     <input type="text" id="chartcolor2" placeholder="Input Acquirer Color" value="#00B2E8" />
                  </div>
               </div>
               <button id="btn_set_color" style="margin-left:10px">Set Color</button>
            </div>
            <div style="width: 350px; text-align: center; display:flex; margin-left: 20px;">
               <div>
                  <div>
                     <label>Width : </label>
                     <input type="number" id="chartw" placeholder="Input Width" value="250" />
                  </div>
                  <div>
                     <label>Height : </label>
                     <input type="number" id="charth" placeholder="Input Height" value="300" />
                  </div>
               </div>
               <button id="btn_set_size" style="margin-left:10px">Set Size</button>
            </div>
            <div style="width: 400px; text-align: center; margin-left: 20px;">
               <div style="display: flex;">
                  <div>
                     <label>Level</label>
                     <input type="number" id="chartlevels" placeholder="Insert Level" value="5" />
                  </div>
                  <button id="btn_set_level" style="margin-left:10px">Set Level</button>
               </div>
               <div style="display: flex;">
                  <div >
                     <label>Space : </label>
                     <input type="number" id="chartspace" placeholder="Input Width" value="0" />
                  </div>
                  <button id="btn_set_space" style="margin-left:10px">Set Chart Space</button>
               </div>
            </div>
            <div>
               <div >
                  <select id="chartstyle" style="width:100px">
                     <option value="style1">style1</option>
                     <option value="style2">style2</option>
                     <option value="style3">style3</option>
                     <option value="style4">style4</option>
                     <option value="style5">style5</option>
                  </select>
               </div>
               <!-- <div>
                  <input type="number" id="get_data_id" placeholder="68 - "/>
                  <button id="btn_get_data_id" style="background-color: #59E800;">Get Data</button>
               </div> -->

            </div>
         </div>
         <div style="margin-top: 10px; display: flex; font-size: 12px;">
            <table id="tb_setting" style="font-size: 12px; text-align: center;">
            </table>
            <table id="tb_data" style="margin-left: 20px; font-size: 12px; text-align: center;" >
            </table>
         </div>
      </div>

      <div id="container" style="display: flex; margin-top: 100px;">
         <div class="radar_chart_container">
            <div>
               <h2 style="text-align: center; " id="title1-1"> </h2>
            </div>
            <div id="chart1-1" class="rad_chart_body"></div>
            <div id="chart1-2" class="rad_chart_body"></div>
            <div id="chart1-3" class="rad_chart_body"></div>
            <div id="titesub" style="text-align:center; display: flex"></div>
         </div>
         <div class="radar_chart_container1">
            <div >
               <h2 style="text-align: center;" id="title2-1"></h2>
            </div>
            <div id="chart2-1" class="rad_chart_body"></div>
            <div id="chart2-2"class="rad_chart_body"></div>
            <div id="chart2-3"class="rad_chart_body"></div>
            <div id="titesub" style="text-align:center; display: flex"></div>
         </div>
         <div class="radar_chart_container1">
            <div >
               <h2 style="text-align: center;" id="title3-1"></h2>
            </div>
            <div id="chart3-1" class="rad_chart_body"></div>
            <div id="chart3-2" class="rad_chart_body"></div>
            <div id="chart3-3" class="rad_chart_body"></div>
            <div id="titesub" style="text-align:center; display: flex;"></div>
         </div>

      </div>
      <!-- <div id="titesub" style="text-align:center;"></div> -->
      <div id="subchartmodal" style="margin-top: 30px">
         <div class="modal-content">
          <!-- <span class="close" style="margin-bottom: 1%; transition: " hidden>&times;</span> -->
          <div id="subdrillchart">
          </div>
         </div>
      </div>

      <input id="json_data"  hidden />
   </body>
   
   <script>
      document.getElementById("json_data").value=JSON.stringify(<?php echo $_POST['test'];?>);
   </script>
   <script src="js/index.js"></script>
</html>
