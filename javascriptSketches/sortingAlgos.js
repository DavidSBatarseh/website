var sortArray = []
var arrayLength;
var bogoButton;
var quickButton;
var bubbleButton;
var index = 0;
var states = "InsertionSort"
var speedSlider;
var firstIteration = true

//Creates canvas, buttons, and sliders for values.
function setup() {
    var cnv = createCanvas(800, 600)
    var x = (windowWidth - width) / 2
    var y = (windowHeight - height) / 2
    cnv.position(x, y)
    arrayLength = createSlider(1,20,10,1)
    arrayLength.position(x, y+ 580)
    speedSlider = createSlider(1,60,10,1)
    speedSlider.position(x + 140, y + 580)
    textSize(20)
    resetButton = createButton('Reset')
    resetButton.position(x + 10,y+525);
    resetButton.mousePressed(setNewArray)
    rectMode(CORNER)
    setNewArray()
    frameRate(5)
}
//Switch statement to iterate sorting process, then render.
function draw() {
    background(55)
    frameRate(speedSlider.value())
    switch(states){
        case "InsertionSort":
            insertionSort()
            render(1)
            break
        case "QuickSort":
            quickSort()
            break
        case "BogoSort":
            bogoSort()
            render(0)
            break
        default:
            noLoop()
    }
}
//draws the array as rectangles
function render(indexBuffer){
    fill(255)
    text('Array Length', 10, 570)
    text('Speed', 150, 570)
    offset = 800/sortArray.length
    for(i = 0; i < sortArray.length; i++){
        fill(200)
        if(i == index + indexBuffer){
            fill(255,0,0)
        }
        rect(0 + offset * i,0,offset,sortArray[i])
    }
}
//Reset array, called when setting new sorting algorithm. 
function setNewArray() {
    console.log(arrayLength.value())
    sortArray = []
    for(i = 0; i < arrayLength.value(); i++){
        sortArray[i] = random(50, 500)
    }
    loop()
    index = 0;
    firstIteration = true;
}
//Check if solved to stop looping
function isSolved(){
    solved = true
    for(i = 0; i < sortArray.length; i ++){
        if(sortArray[i] > sortArray[i+1]){
            solved = false
        }
    }
    if(solved){
        noLoop()
    }
}
//insertionSort algorithm, with swap function. 
function insertionSort(){
    if(sortArray[index] > sortArray[index+1]){ 
        swap(index, index+1)
        index-= 2
    }
    index++
    isSolved()
}
function swap(i,j){
    temp = sortArray[i]
    sortArray[i] = sortArray[j]
    sortArray[j] = temp
}
//Hard to do non-recursively.
function quickSort(){
    states = "thisissuchabadwaytodothis"
    while(index < 20){
    index++
    redraw(5)
    }
}
//bogosort algorithm with randomize function.
function bogoSort(){
    if(sortArray[index] > sortArray[index+1]){
        randomizeSortArray()
    }
    if(index == sortArray.length){
        noLoop()
    }
    index++
    if(firstIteration){
        firstIteration = false
        index--
    }
}
function randomizeSortArray(){
    for(i = sortArray.length-1; i > 0; i--){
        tempIndex = floor(random() * i)
        swap(tempIndex, i)
    }
    index = 0;
}