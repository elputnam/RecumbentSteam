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
  frameRate(15);

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
  let back = map(very, 0, 50, 175, 0);
  background(back, 100, 100, 1);
  // print(frameCount);
  if (frameCount < 150){
    noStroke();
    fill(random(175,200), random(100), random(100));
    for (let l = 0; l < 500; l++){
      circle(random(width), random(height), random(100));
    }
  }

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
    fill(random(20,50), 25, 100, 5);
    // beginShape();
    // curveVertex(width/2, height/2);
    // curveVertex(mouseX+random(100), mouseY+random(100));
    // curveVertex(mouseX+random(-100,100), mouseY+random(200));
    // curveVertex(mouseX+random(-100,100), mouseY+random(-100,100));
    // endShape(CLOSE);
    circle(mouseX, mouseY, height*.5);
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
  push();
  // translate(mouseX*.25, mouseY*.5);
  translate(width*.05, height*.4)
  scale(0.75)
  // let a1 = atan2(mouseY - height/2, mouseX - width/2);
  // rotate(a1);
  rotate(radians(-25));
  let s = random(100);
  let l = random(100);
  // let wig = random(width*.003, width*.007);
  let wig = random(5,10);
  // let wig = map(mouseX, 0, width, 5, 25);
  for (let i = 0; i < 25; i++){
    let a = map(light, 0, 1200, 175, 360);
    let w1 = map(light, 0, 1500, 0, width);
    stroke(a, s, l);
    circle(w1, height*0, wig*i);  
    let b = map(very, 0, 1200, 175, 360);
    let w2 = map(very, 0, 1500, 0, width);
    stroke(b, s, l);
    circle(w2, height*.25, wig*i);
    let c = map(moderate, 0, 1200, 175, 360);
    let w3 = map(moderate, 0, 1500, 0, width);
    stroke(c, s, l);
    circle(w3, height*.5, wig*i);
    let d = map(sedentary, 0, 1200, 175, 360);
    let w4 = map(sedentary, 0, 1500, 0, width);
    stroke(d, s, l);
    circle(w4, height*.75, wig*i);
  }
  pop();

  // stepdust
  push();
  translate(width*.75, height*.4);
  // let a = atan2(mouseY - height/2, mouseX - width/2);
  // rotate(a);
  let num1 = 200;
  let cir = (360 / num1) * (frameCount % num1);
  rotate((radians(cir)));
  let inside = map(steps, 0, 100, 100, 0)
  noStroke();
  fill(inside);
  let stretch = map(steps, 0, 100, width, 200)
  for (let i = 0; i < steps; i++){
    rect(0 + random(-stretch), 0 + random(stretch/2), random(inside), random(inside));
  }
  pop();
}