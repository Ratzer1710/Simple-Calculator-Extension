window.onload = function () {
    document.getElementById("button1").addEventListener("click", function() {digit_display(1);});
    document.getElementById("button2").addEventListener("click", function() {digit_display(2);});
    document.getElementById("button3").addEventListener("click", function() {digit_display(3);});
    document.getElementById("button4").addEventListener("click", function() {digit_display(4);});
    document.getElementById("button5").addEventListener("click", function() {digit_display(5);});
    document.getElementById("button6").addEventListener("click", function() {digit_display(6);});
    document.getElementById("button7").addEventListener("click", function() {digit_display(7);});
    document.getElementById("button8").addEventListener("click", function() {digit_display(8);});
    document.getElementById("button9").addEventListener("click", function() {digit_display(9);});
    document.getElementById("button0").addEventListener("click", function() {digit_display(0);});
    document.getElementById("button_dot").addEventListener("click", function() {digit_display(".");});

    document.getElementById("button_clear").addEventListener("click", function() {clearEverything();});
    document.getElementById("button_delete").addEventListener("click", function() {erase();});
    document.getElementById("button_addition").addEventListener("click", function() {add();});
    document.getElementById("button_substraction").addEventListener("click", function() {substract();});
    document.getElementById("button_multiplication").addEventListener("click", function() {multiply();});
    document.getElementById("button_division").addEventListener("click", function() {divide();});
    document.getElementById("button_total").addEventListener("click", function() {result();});
    document.addEventListener('keyup', doc_keyUp, false);
}

var number_string = "";
var accumulate = 0;
var addition = false;
var substraction = false;
var multiplication = false;
var division = false;
var first_operation = true;
var digit_pushed = false;
var negative_digit = false;
var operation_counter;
var historial = "";

function digit_display(digit) {
    digit_pushed = true;
    operation_counter = 0;

    var last_digit = historial.substr(historial.length -1);
    var second_last_digit = historial.substr(historial.length -2);
    if (last_digit != "." && last_digit != 1 && last_digit != 2 && last_digit != 3 && last_digit != 4 && last_digit != 5 && last_digit != 6 && last_digit != 7 && last_digit != 8 && last_digit != 9 && last_digit != 0){
        document.getElementById("display_total").value = document.getElementById("display_total").value + number_string + digit;
        number_string = digit;
    } else if (last_digit == "." || last_digit == 1 || last_digit == 2 || last_digit == 3 || last_digit == 4 || last_digit == 5 || last_digit == 6 || last_digit == 7 || last_digit == 8 || last_digit == 9 || last_digit == 0){
        document.getElementById("display_total").value = document.getElementById("display_total").value + digit;
        number_string = number_string + digit;
    } else if (last_digit == "÷" || last_digit == "x" || last_digit == "+" || last_digit == "-") {
        document.getElementById("total").value = accumulate;
    };

    var counter = 0;
    verify_number_string = number_string.split("");

    for (var i = 0; i < verify_number_string.length; i++) {
        if (verify_number_string[i] == ".") {counter++;};
    };

    if (counter > 1) {
        alert("The decimal number isn't valid: " + number_string);
        clearEverything();
    } else if (counter == 1 && first_operation && number_string === ".") {
        number_string = "0.";
        document.getElementById("display_total").value = "0.";
    } else if (!first_operation && number_string === ".") {
        erase();
        number_string = "0.";
        document.getElementById("display_total").value = document.getElementById("display_total").value + "0.";
    };   
    historial = historial + digit;
}

function substract() {
    if (first_operation && !digit_pushed && !negative_digit) {
        number_string = "-";
        negative_digit = true;
    } else if (first_operation && negative_digit) {
        accumulate = accumulate + parseFloat(number_string);
        number_string = "";
        addition = false;
        substraction = true;
        multiplication = false;
        division = false;
        first_operation = false;
        operation_counter++;
    } else if (first_operation && !negative_digit) {
        accumulate = accumulate + parseFloat(number_string);
        number_string = "";
        addition = false;
        substraction = true;
        multiplication = false;
        division = false;
        first_operation = false;
        operation_counter++;
    } else if (!first_operation && operation_counter === 1) {
        number_string = "-";
        
        operation_counter++;
    } else if (!first_operation) {
        if (addition) {
            accumulate = accumulate + parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        } else if (substraction) {
            accumulate = accumulate - parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        } else if (multiplication) {
            accumulate = accumulate * parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        } else if (division) {
            accumulate = accumulate / parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        }
        number_string = "";
        addition = false;
        substraction = true;
        multiplication = false;
        division = false;
        first_operation = false;
        operation_counter++;
    };

    historial = historial + " - ";

    document.getElementById("display_total").value = document.getElementById("display_total").value + "-";
    
    if (!digit_pushed && negative_digit && !first_operation) {
        alert("You need to enter a number before substracting. The calculator will restart");
        clearEverything();
        document.getElementById("display_total").value = "";
    }
}

function add() {
    if (!first_operation) {
        if (addition) {
            accumulate = accumulate + parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        } else if (substraction) {
            accumulate = accumulate - parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        } else if (multiplication) {
            accumulate = accumulate * parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        } else if (division) {
            accumulate = accumulate / parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        };
        number_string = "";
        addition = true;
        substraction = false;
        multiplication = false;
        division = false;
        first_operation = false;
        operation_counter++;
    } if (first_operation) {
        accumulate = accumulate + parseFloat(number_string);
        document.getElementById("display_total").value=accumulate;
        number_string = "";
        addition = true;
        substraction = false;
        multiplication = false;
        division = false;
        first_operation = false;
        operation_counter++;
    };

    historial = historial + " + ";

    document.getElementById("display_total").value = document.getElementById("display_total").value + "+";

    if (!digit_pushed) {
        alert("You need to enter a number before adding. The calculator will restart");   
        clearEverything();
        document.getElementById("display_total").value = "";
    } if (operation_counter > 1) {
        alert("You've pushed the add button 2 times. The calculator will restart");
        clearEverything();
        document.getElementById("display_total").value = "";
    }
}

function multiply() {
    if (!first_operation) {
        if (addition) {
            accumulate = accumulate + parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        } else if (substraction) {
            accumulate = accumulate - parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        } else if (multiplication) {
            accumulate = accumulate * parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        } else if (division) {
            accumulate = accumulate / parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        };
        number_string = "";
        addition = false;
        substraction = false;
        multiplication = true;
        division = false;
        first_operation = false;
        operation_counter++;

    } if (first_operation) {
        accumulate = accumulate + parseFloat(number_string);
        document.getElementById("display_total").value=accumulate;

        number_string = "";
        addition = false;
        substraction = false;
        multiplication = true;
        division = false;
        first_operation = false;
        operation_counter++;

    };

    historial = historial + " * ";

    document.getElementById("display_total").value = document.getElementById("display_total").value + "x";

    if (!digit_pushed) {
        alert("You need to enter a number before multiplying. The calculator will restart");   
        clearEverything();
        document.getElementById("display_total").value = "";
    } if (operation_counter > 1) {
        alert("You've pushed the multiply button 2 times. The calculator will restart");
        clearEverything();
        document.getElementById("display_total").value = "";
    }
}

function divide() {
    if (!first_operation) {
        if (addition) {
            accumulate = accumulate + parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        } else if (substraction) {
            accumulate = accumulate - parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        } else if (multiplication) {
            accumulate = accumulate * parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        } else if (division) {
            accumulate = accumulate / parseFloat(number_string);
            document.getElementById("total").value=accumulate;
        };
        number_string = "";
        addition = false;
        substraction = false;
        multiplication = false;
        division = true;
        first_operation = false;
        operation_counter++;

    } if (first_operation) {
        accumulate = accumulate + parseFloat(number_string);
        document.getElementById("display_total").value=accumulate;

        number_string = "";
        addition = false;
        substraction = false;
        multiplication = false;
        division = true;
        first_operation = false;
        operation_counter++;

    };

    historial = historial + " / ";

    document.getElementById("display_total").value = document.getElementById("display_total").value + "÷";

    if (!digit_pushed) {
        alert("You need to enter a number before dividing. The calculator will restart");   
        clearEverything();
        document.getElementById("display_total").value = "";
    } if (operation_counter > 1) {
        alert("You've pushed the divide button 2 times. The calculator will restart");
        clearEverything();
        document.getElementById("display_total").value = "";
    }
}

function result() {
    if (addition) {
        document.getElementById("total").value = accumulate + parseFloat(number_string);
        first_operation = true;
        addition = false;
    } else if (substraction) {
        document.getElementById("total").value = accumulate - parseFloat(number_string);
        first_operation = true;
        substraction = false;
    } else if (multiplication) {
        document.getElementById("total").value = accumulate * parseFloat(number_string);
        first_operation = true;
        multiplication = false;
    } else if (division) {
        document.getElementById("total").value = accumulate / parseFloat(number_string);
        first_operation = true;
        division = false;
    }
    if (document.getElementById("total").value == Infinity || document.getElementById("total").value == NaN) {
        alert("Error. The calculator will restart");
        clearEverything();
        document.getElementById("display_total").value = "";
    }
    document.getElementById("display_total").value = "";

    historial = historial + " = " + document.getElementById("total").value + "";

    accumulate = parseFloat(document.getElementById("total").value);
    number_string = "";
    addition = false;
    substraction = false;
    multiplication = false;
    division = false;
    first_operation = false;
}

function clearEverything() {
    document.getElementById("display_total").value = "";
    document.getElementById("total").value = "";
    number_string = "";
    accumulate = 0;
    addition = false;
    substraction = false;
    multiplication = false;
    division = false;
    first_operation = true;
    digit_pushed = false;
    negative_digit = false;
    operation_counter = 0;
    historial = "";
}

function erase() {
    var last_digit = historial.substr(historial.length -1);
    historial = historial.substring(0, historial.length - 1);
    var txt = document.getElementById("display_total");
    txt.value = txt.value.substring(0, txt.value.length - 1);
    number_string = number_string.substring(0, number_string.length -1);
}

function doc_keyUp(e) {
    if (e.keyCode == 96 || e.keyCode == 48) {
        digit_display(0);
    }
    if (e.keyCode == 97 || e.keyCode == 49) {
        digit_display(1);
    }
    if (e.keyCode == 98 || e.keyCode == 50) {
        digit_display(2);
    }
    if (e.keyCode == 99 || e.keyCode == 51) {
        digit_display(3);
    }
    if (e.keyCode == 100 || e.keyCode == 52) {
        digit_display(4);
    }
    if (e.keyCode == 101 || e.keyCode == 53) {
        digit_display(5);
    }
    if (e.keyCode == 102 || e.keyCode == 54) {
        digit_display(6);
    }
    if (e.keyCode == 103 || e.keyCode == 55) {
        digit_display(7);
    }
    if (e.keyCode == 104 || e.keyCode == 56) {
        digit_display(8);
    }
    if (e.keyCode == 105 || e.keyCode == 57) {
        digit_display(9);
    }
    if (e.keyCode == 110 || e.keyCode == 190 || e.keyCode == 188) {
        digit_display(".");
    }
    if (e.keyCode == 13) {
        result();
    }
    if (e.keyCode == 107) {
        add();
    }
    if (e.keyCode == 109) {
        substract();
    }
    if (e.keyCode == 106) {
        multiply();
    }
    if (e.keyCode == 111) {
        divide();
    }
    if (e.keyCode == 8) {
        erase();
    }
    if (e.keyCode == 46) {
        clearEverything();
    }
}