var j = [{
    top: 783.6,
    left: 78.6
}, {
    top: 820.6,
    left: 70.6
}, {
    top: 826.6,
    left: 56.1
}, {
    top: 820.6,
    left: 42.0
}, {
    top: 817.6,
    left: 26.5
}, {
    top: 835.6,
    left: 13.9
}, {
    top: 881.6,
    left: 10.2
}];


for (var i = 0; i < j.length; i++) {
    console.log("{top:(" + ((j[i].top * 33) / 165)/100 + "*w)+\"px\",left:\"" + j[i].left + "%\"},");
}
