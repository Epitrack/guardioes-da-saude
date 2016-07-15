var fs = require('fs');
var trad = require('./string_trad.json');
console.log(trad.length);
var obj = {};

function init() {
    trad.forEach(function(value, index) {
        for (v in value) {
            if (obj[v] === undefined) {
                obj[v] = {};
            }
            if (obj[v][getString(index)] === undefined) {
                obj[v][getString(index)] = {};
            }
            obj[v][getString(index)] = value[v];
        }
    });
    console.log(obj);
    fs.writeFile("olympics_traducoes.json", JSON.stringify(obj), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

init();

function getString(s) {
    var r = "";
    for (var i = 0; i < (5 - (s + "").length); i++) {
        r += "" + 0;
    }
    r += s;
    return r;
}

// console.log(getString(1))

// var array = fs.readFileSync('string_trad.csv').toString().split("\n");
// var head = array[0];
// var obj = {};
// console.log(head);
// console.log(array.length);
// for (i in array) {
//     /**/
//     var o = array[i].split(",");
//     for (var j = 0; j < head.length; j++) {
//         if (obj[head[j]] === undefined) {
//             obj[head[j]] = {};
//         }
//         obj[head[j]][j] = []
//     }
//     console.log();
//     // console.log(array[i]);
// }

/*
{
	"Português":{
		0:"10 Anos",
		1:"A data de aniversário deve ser menor que hoje."
	},
	"Inglês":{
		0:"10 Years",
		1:"The date of birth must be earlier than the current date."	
	}
}
*/
