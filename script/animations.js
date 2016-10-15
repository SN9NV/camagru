function fade(element, startcolour, endcolour, period) {
    var red_change = (startcolour[0] - endcolour[0]) / 50;
    var green_change = (startcolour[1] - endcolour[1]) / 50;
    var blue_change = (startcolour[2] - endcolour[2]) / 50;
    var transparancy_change = (startcolour[3] - endcolour[3] / 50);
    var currentcolour = startcolour;
    var stepcount = 0;
    var timer = setInterval(function() {
        currentcolour[0] = parseInt(currentcolour[0] - red_change);
        currentcolour[1] = parseInt(currentcolour[1] - green_change);
        currentcolour[2] = parseInt(currentcolour[2] - blue_change);
        element.style.backgroundColor = 'rgb(' + currentcolour.toString() + ')';
        stepcount += 1;
        if (stepcount >= 50) {
            element.style.backgroundColor = 'rgb(' + endcolour.toString() + ')';
            clearInterval(timer);
        }
    }, period / 50);
}