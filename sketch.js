//Lists of Months
let lightList = []; //lightly active minutes
let moderateList = []; //moderately active minutes
let veryList = []; //very active minutes
let sedentaryList = []; //sedentary minutes
let stepList = []; //steps

// Daily Cycle - variables for selceting and cycling throguh days
let lightActive = [];
let  moderateActive = [];
let veryActive = []; 
let notActive = [];
let stepCount = [];
let light_data, very_data, moderate_data, sedentary_data;
let num_days; // number of days of data
let day_num = 0;
let num_steps; //number of step intervals
let step_num = 0;
let new_day = true; // starting data for a new night
let day_index = 0; // index for each night
let day_data_length; // number of data points for a night
let day_data_index; // index for data points for a night
let light, very, moderate, sedentary, steps;


function preload(){
  //Load list of json file names
  lightList = loadStrings('lightlyActive-dataList.txt');
  moderateList = loadStrings('moderatelyActive-dataList.txt');
  veryList = loadStrings('veryActive-dataList.txt');
  sedentaryList = loadStrings('sedentary-dataList.txt');
  stepList = loadStrings('steps-dataList.txt')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);

  //select month
  let month = int(random(18));
    print(month);
    lightActive = loadJSON(lightList[month]);
    moderateActive = loadJSON(moderateList[month]);
    veryActive = loadJSON(veryList[month]);
    notActive = loadJSON(sedentaryList[month]);
    stepCount = loadJSON(stepList[month]);
}

function draw() {
  let back = map(very, 0, 50, 0, 175);
  background(back, 100, 100, 1);
  // print(frameCount);

  if (frameCount==100){
    num_days = Object.keys(lightActive).length;
    print(num_days);
    num_steps = Object.keys(stepCount).length;
  }

  if (frameCount > 150){
    
    light = lightActive[day_num]['value'];
    very = veryActive[day_num]['value'];
    moderate = moderateActive[day_num]['value'];
    sedentary = notActive[day_num]['value'];
    steps = stepCount[step_num]['value'];
    print("light:", light, "very:", very, "moderate:", moderate, "sedentary:", sedentary, "steps:", steps);
    day_num += 1;
    step_num += 1;

    activityMapping();
    if (day_num >= num_days){
      day_num = 0;
      }
    
    if (step_num >= num_steps){
      step_num = 0;
    }
    }
  }

function activityMapping(){
  noFill();
  let s = random(100);
  let l = random(100);
  for (let i = 0; i < 15; i++){
    let a = map(light, 0, 1200, 175, 360);
    let w1 = map(light, 0, 1500, 0, width);
    stroke(a, s, l);
    circle(w1, height*.2, 5*i);  
    let b = map(very, 0, 1200, 175, 360);
    let w2 = map(very, 0, 1500, 0, width);
    stroke(b, s, l);
    circle(w2, height*.4, 5*i);
    let c = map(moderate, 0, 1200, 175, 360);
    let w3 = map(moderate, 0, 1500, 0, width);
    stroke(c, s, l);
    circle(w3, height*.6, 5*i);
    let d = map(sedentary, 0, 1200, 175, 360);
    let w4 = map(sedentary, 0, 1500, 0, width);
    stroke(d, s, l);
    circle(w4, height*.8, 5*i);
  }
  push();
  translate(width/2, height/2);
  let inside = map(steps, 0, 100, 50, 0)
  noStroke();
  fill(inside);
  let stretch = map(steps, 0, 100, width, 200)
  for (let i = 0; i < steps; i++){
    rect(0 + random(-stretch), 0 + random(stretch/2), random(25), random(25));
  }
}