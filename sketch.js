//Lists of Months
let lightList = []; //lightly active minutes
let moderateList = []; //moderately active minutes
let veryList = []; //very active minutes
let sedentaryList = []; //sedentary minutes

// Daily Cycle - variables for selceting and cycling throguh days
let lightActive = [];
let  moderateActive = [];
let veryActive = []; 
let notActive = [];
let light_data, very_data, moderate_data, sedentary_data;
let num_days; // number of days of data
let new_day = true; // starting data for a new night
let day_index = 0; // index for each night
let day_data_length; // number of data points for a night
let day_data_index; // index for data points for a night
let light, very, moderate, sedentary;


function preload(){
  //Load list of json file names
  lightList = loadStrings('lightlyActive-dataList.txt');
  moderateList = loadStrings('moderatelyActive-dataList.txt');
  veryList = loadStrings('veryActive-dataList.txt');
  sedentaryList = loadStrings('sedentary-dataList.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

    //select month
    let month = int(random(18));
    print(month);
    lightActive = loadJSON(lightList[month]);
    moderateActive = loadJSON(moderateList[month]);
    veryActive = loadJSON(veryList[month]);
    notActive = loadJSON(sedentaryList[month]);


}

function draw() {
  background(220);
  print(frameCount);

  if (frameCount==100){
    num_days = Object.keys(lightActive).length;
    print(num_days);
  }

  if (frameCount > 200){
    if (new_day) {
      // starting a new night of data
      day_data = lightActive[day_index]["levels"]["data"];
      day_data_length = night_data.length;
      new_day = false;
      day_data_index = 0;
  }
    print(light, very, moderate, sedentary);
  }
  day += 1;

  if (day > num_days){
    day = 0;
  }
  
}

