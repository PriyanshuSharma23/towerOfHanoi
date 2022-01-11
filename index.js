var N;
var blockWidth = 5;
var results = [];
$("#mainForm").on("submit", handleSubmit);
async function handleSubmit(e) {
    e.preventDefault();
    var value = $("#inputField").val();
    $("#inputField").val("");
    $("#t0").empty();
    $("#t1").empty();
    $("#t2").empty();
    N = parseInt(String(value));
    var towers = [[], [], []];
    for (var i = 1; i <= N; i++) {
        var block = $("<div></div>")
            .addClass("block")
            .css("width", "".concat((Math.log(i) + 1) * blockWidth, "rem"));
        $("#t0").append(block);
    }
    towerOfHanoi(N);
    animateBlocks();
    // await moveBlock(0, 1);
    console.log(results);
}
function towerOfHanoi(n, start, helper, to) {
    if (start === void 0) {
        start = 0;
    }
    if (helper === void 0) {
        helper = 1;
    }
    if (to === void 0) {
        to = 2;
    }
    if (n == 1) {
        results.push([start, to]);
    } else {
        towerOfHanoi(n - 1, start, to, helper);
        results.push([start, to]);
        towerOfHanoi(n - 1, helper, start, to);
    }
}
function displayTowers(towers) {
    for (var i = 0; i < towers[0].length; i++) {
        $("#t0").append(towers[0][i]);
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function moveBlock(start, to) {
    let blockToBeMoved = $(`#t${start}`).children().first();
    await sleep(20);
    blockToBeMoved.addClass("flew");

    await sleep(100);
    let backup = $(`#t${start}`).children().first();
    blockToBeMoved.remove();
    $(`#t${to}`).prepend(backup);

    
    await sleep(100);
    backup.removeClass("flew");
}

async function animateBlocks() {
    for (let i = 0; i < results.length; i++) {
        await sleep(400);
        moveBlock(results[i][0], results[i][1]);
        // console.log(results[])
    }
}
