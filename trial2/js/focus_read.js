var fr = [];
var forwardTimer;
$(document).ready(function () {

    // override all spacebar event
    window.onkeydown = function(e) { 
        return !(e.keyCode == 32);
    };

    $('#f1').hide();

    // hide
    var $ps = $('div.focus_read p');
    $ps.hide();

    // read into array
    $ps.each(function (index) {
        $p = $ps[index];
        fr.push($p.textContent.split(' ').filter(function (v) {
            return v !== ''
        }));
    });

    // custom display
    $.each(fr, function (index_p, value_p) {

        jQuery('<p/>', {
                id: 'fr_p_' + index_p,
        }).appendTo('div.focus_read');

        $.each(value_p, function (index_w, value_w) {
            jQuery('<span/>', {
                    id: 'fr_p_' + index_p + '_w_' + index_w,
                    class: 'unread',
                    text: value_w + ' '
            }).appendTo('#fr_p_' + index_p);
        });

    });

    controller_setup();

});

/* Moving */
var cur_p = 0;
var cur_w = 0;

function moveNextWord() {
    setRead(cur_p, cur_w);
    if (cur_p == 2 && cur_w==60) {
        $('#f1').show();
    }
    if (isLastWord(cur_p, cur_w)) {
        cur_p += 1;
        cur_w = -2; // tricky solution for pausing 2 blocks for next paragraph
    } else {
        cur_w += 1;
    }
    setCurrent(cur_p, cur_w);
}

function movePreciousWord() {
    setUnread(cur_p, cur_w);
    if (cur_w == 0) {
        cur_p -= 1;
        cur_w = (fr[cur_p].length - 1);
    } else {
        cur_w -= 1;
    }
    setCurrent(cur_p, cur_w);
}

function forward() {
    var i;
    INV = setInterval(function () {
        if (i >= wordArray.length - 1) {
            clearInterval(INV);
        }
        $el.append(wordArray[i] + ' ');
        i++;
    }, speed);
}

/* Change word status */
function setRead(p, w) {
    $('#fr_p_' + p + '_w_' + w).removeClass('unread').removeClass('current').addClass('read');
}

function setUnread(p, w) {
    $('#fr_p_' + p + '_w_' + w).removeClass('read').removeClass('current').addClass('unread');
}

function setCurrent(p, w) {
    $('#fr_p_' + p + '_w_' + w).removeClass('read').removeClass('unread').addClass('current');
}

function isLastWord(p, w) {
    var length = fr[p].length;
    if (w >= (length - 1)) return true;
    return false;
}

/* Mouse events */

//var ratio = 1000;
//var x_start = -1; // not started
//var acc = 0;
//var threshold = 10;
//$("html").mousedown(function (e) {
//  window.x_start = e.pageX;
//});
//
//$("html").mousemove(function (e) {
//  if (x_start >= 0) {
//
//    var d = (e.pageX - x_start);
//    console.log("dis = " + d);
//    if (acc >= threshold) {
//      moveNextWord();
//      acc %= threshold;
//    }
//    acc++;
//    // clearInterval(window.forwardTimer);
//    // window.forwordTimer = setInterval(moveNextWord, d * ratio);
//
//  }
//});
//
//$("html").mouseup(function (e) {
//  clearInterval(window.forwardTimer);
//});

/* Controller events */
var current_wpm = 300;
var is_start = false;

function controller_setup() {
    $controller = $('#focus_read_controller');
    $controller.on("change mousemove", function () {
        current_wpm = $(this).val();
        // update label
        label = $('#focus_read_controller_label')[0];
        label.textContent = current_wpm + " WPM";
    });

    $('body').keydown(function (e) {
        if (e.keyCode == 32) { // user has pressed space
            startReading();
        }
    });

    $('body').keyup(function (e) {
        if (e.keyCode == 32) { // user has pressed space
            stopReading();
        }
    });
}

function startReading() {
    if (is_start) return;
    is_start = true;
    console.log("start reading");
    clearInterval(forwardTimer);
    if (current_wpm != 0) {
        forwardTimer = setInterval(moveNextWord, 60000 / current_wpm);
    }
}

function stopReading() {
    if (!is_start) return;
    is_start = false;
    console.log("stop reading");
    clearInterval(forwardTimer);
}
