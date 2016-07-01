var j = [{
    top: 936.6,
    left: 16.5
}, {
    top: 996.6,
    left: 69.7
}, {
    top: 1032.9,
    left: 77.8
}, {
    top: 1085.9,
    left: 76.8
}, {
    top: 1126.9,
    left: 69
}, {
    top: 1148.9,
    left: 55.69
}, {
    top: 1160,
    left: 41.3
}, {
    top: 1174,
    left: 27.8
}, {
    top: 1202,
    left: 14.5
}, {
    top: 1270,
    left: 12.2
}, {
    top: 1316,
    left: 20.9
}, {
    top: 1337,
    left: 34.9
}, {
    top: 1348,
    left: 49.9
}, {
    top: 1362,
    left: 64.9
}, {
    top: 1398,
    left: 76.2
}, {
    top: 1452,
    left: 78.7
}, {
    top: 1499,
    left: 71.8
}, {
    top: 1531,
    left: 58.8
}, {
    top: 1548,
    left: 41.8
}];


for (var i = 0; i < j.length; i++) {
    console.log("{top:(" + ((j[i].top * 33) / 165) / 100 + "*w)+\"px\",left:\"" + j[i].left + "%\"},");
}
