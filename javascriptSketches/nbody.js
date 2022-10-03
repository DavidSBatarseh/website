var planetX = []
var planetY = []
var planetZ = []
var planetXVel = []
var planetYVel = []
var planetZVel = []
var gravity = 0.1
var stepSlider
var resetButton
var comX = 0
var comY = 0
var comZ = 0
function setup() {
    var cnv = createCanvas(800, 600, WEBGL)
    var x = (windowWidth - width) / 2
    var y = (windowHeight - height) / 2
    newSet()
    stepSlider = createSlider(1,4,1,1)
    stepSlider.position(x, y)
    resetButton = createButton('Reset')
    resetButton.position(x,y+20);
    resetButton.mousePressed(newSet)
    cnv.position(x, y)
    noStroke()
  }
  
function draw() {
    orbitControl()
    background(0)
    steps = stepSlider.value()
    for(i = 0; i < steps; i++){
        gravityIteration()
        render()
    }
}

function gravityIteration(){
    comX,comY,comZ = 0,0,0
    for(i = 0; i < 3; i++){
        for(j = 0; j < 3; j++){
            if(i != j){
                distance = sqrt((planetX[i] - planetX[j])**2 + (planetY[i] - planetY[j])**2 + (planetZ[i] - planetZ[j])**2)
                planetXVel[i] -= gravity * (planetX[i] - planetX[j])/(distance**2)
                planetYVel[i] -= gravity * (planetY[i] - planetY[j])/(distance**2)
                planetZVel[i] -= gravity * (planetZ[i] - planetZ[j])/(distance**2)
            }
        }
        planetX[i] += planetXVel[i]
        planetY[i] += planetYVel[i]
        planetZ[i] += planetZVel[i]
        comX += planetX[i]
        comY += planetY[i]
        comZ += planetZ[i]
    }
    comX = comX/3
    comY = comY/3
    comZ = comZ/3
    console.log(comX)
    console.log(planetX)
}
//Implement bottom two functions to correct center of mass.

/* function updatePosition(){
} */

/* function centerOfMass(){
    planetX[4] = 0
    planetY[4] = 0
    planetZ[4] = 0
    
    for(i = 0; i < 3; i++){
        planetX[4] += planetX[i]
        planetY[4] += planetY[i]
        planetZ[4] += planetZ[i]
    }
    planetX[4] = planetX[4]/3
    planetY[4] = planetY[4]/3
    planetZ[4] = planetZ[4]/3
} */
function render(){
    ambientLight(255,255,255)
    pointLight(255,255,255, 0, 0, 0)
    for(i = 0; i < 3; i++){
        push()
        fill(i * 90,100,i * 90)
        ambientMaterial(i * 90, 100, i * 90)
        translate(planetX[i], planetY[i], planetZ[i])
        sphere(10) 
        pop()
    }
}

function newSet(){
    for(i = 0; i < 3; i++){
        planetX[i] = (random(-100 * i, 100 * i))
        planetY[i] = (random(-100 * i, 100 * i))
        planetZ[i] = (random(-100 * i, 100 * i))
        planetXVel[i] = random(-.002,.002)
        planetYVel[i] = random(-.002,.002)
        planetZVel[i] = random(-.002,.002)
    }
    background(0)
}