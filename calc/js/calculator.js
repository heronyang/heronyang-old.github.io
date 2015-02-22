var OPS = {
    PLUS: 0,
    MINUS: 1,
    TIMES: 2,
    DIVIDE: 3,
    EQUAL: 4
}

var stackNum = 0;
var stackOp = OPS.PLUS;
var reset = false;
var error = false;

/* Stack */
function pushNum(num)   { stackNum = num; }
function pushOp(op)     { stackOp = op; }
function popNum()       { return stackNum; }
function popOp()        { return stackOp; }
// function stackIsEmpty() { return (stackOp == -1); }

/* Main */
function calc(num1, op, num2) {
    console.log("calc >> " + num1 + ", " + op + ", " + num2);
    if( op == OPS.PLUS )        return num1 + num2;
    else if( op == OPS.MINUS )  return num1 - num2;
    else if( op == OPS.TIMES )  return num1 * num2;
    else if( op == OPS.DIVIDE ) {
        if( num2 == 0 ) {
            error = true;
            return 0;
        }
        return num1 / num2;
    }
}

/* Event Handler */
function pressDigit(d) {

    console.log(d + " is pressed");

    var screen = document.getElementById("screen");
    if( reset || screen.innerText == "0" ) {
        screen.innerText = d;
        reset = false;
    } else {
        screen.innerText += d;
    }

}

function pressOp(op) {

    var screen = document.getElementById("screen");
    var curNum = parseInt(screen.innerText);
    console.log(op + " is pressed, screen = " + screen.innerText);

    r = Math.floor(calc(popNum(), popOp(), curNum));
    if( error ) {
        screen.innerText = "Error";
        error = false;
    } else {
        screen.innerText = r;
    }

    if( op != OPS.EQUAL ) {
        pushNum(r);
        pushOp(op);
    } else {
        pushNum(0);
        pushOp(OPS.PLUS);
    }

    reset = true;

}

function pressClear() {
    var screen = document.getElementById("screen");
    screen.innerText = "0";
    stackNum = 0;
    stackOp = OPS.PLUS;
    reset = false;
    error = false;
}

// main function
(function() {
    console.log("calculator starts.");
})();
