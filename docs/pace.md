---
layout: default
title:  "Pace"
permalink: /pace/
---

<style>

.pace {
  width: 100%;
  text-align: center;
}

.pace button {
  background-color: #E0E0E0;
  float: left;
  width: 20%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-top: 20px;
  padding-bottom: 20px;
}
.pace button:hover {
  background-color: #BDBDBD;
}
.pace button.active {
  background-color: #03A9F4;
}

#slider {
  -webkit-appearance: none;
  width: 100%;
  height: 20px;
  background: #BDBDBD;
  outline: none;
}
#slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #03A9F4;
  cursor: pointer;
}
#slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #03A9F4;
  cursor: pointer;
}

#uiTime {
  font-size: 80px;
  font-weight: bold;
  align: center;
  padding: 20px;
}
#uiPace {
  color: #9E9E9E;
  font-size: 40px;
  font-weight: bold;
  align: center;
}

</style>

<div class="pace">
  <button class="distanceTab" onclick="setDistance(event, '5')">5K</button>
  <button class="distanceTab" onclick="setDistance(event, '10')">10K</button>
  <button class="distanceTab" onclick="setDistance(event, '15')">15K</button>
  <button class="distanceTab" onclick="setDistance(event, '21.0975')">Half</button>
  <button class="distanceTab active" onclick="setDistance(event, '42.195')">Marathon</button>

  <!-- min pace 2:20 (140s) to max pace 10:00 (600s) -->
  <input type="range" min="140" max="600" value="370" id="slider">

  <p id="uiTime"></p>
  <p id="uiPace"></p>
</div>

<script>
  var distance = 42.195; // default
  var slider = document.getElementById('slider');
  var pace = slider.value; // in seconds

  slider.oninput = function() {
    pace = this.value;
    update();
  }

  function setDistance(evt, meters) {
    var distanceTab = document.getElementsByClassName("distanceTab");
    for (var i = 0; i < distanceTab.length; i++) {
      distanceTab[i].className = distanceTab[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
    distance = meters;

    update();
  }

  function update() {
    var totalSeconds = distance * pace; // total time in seconds = distance in km * pace in seconds

    var uiTime = document.getElementById('uiTime');
    uiTime.innerHTML = formatToHHMMSS(totalSeconds);

    var uiPace = document.getElementById('uiPace');
    uiPace.innerHTML = `${formatToHHMMSS(totalSeconds)} min/km`;
  }

  function formatToHHMMSS(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
  }

  update();
</script>
