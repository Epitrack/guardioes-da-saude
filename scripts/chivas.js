String.prototype.replaceAt = function(index, character) {
    try {
        return this.substr(0, index) + character + this.substr(index + character.length);
    } catch (e) {
        return this;
    }
}

var id = "1274457735915725";
// var newid = "12744577359";
var newid = "127";
var token = "EAAEPIQIa3K4BADTHZAo5tz8MPb9MMwZCD0vgcsxzYoqlUFEbeZBr0h8qpcUBaFqfZCMOIBg1W0HslFcbLcV0PnWPMaqbPZCgZAGAe5ZC1XR8BwKEvT8xuXK5tSXNRnNLyhKoFUsNEZAhOHR2fdExKpecAqwlQb1M7Yoe7gew5MSHYgZDZE";
var maxupdates = 20;
var qtd = 3;
var vetor_ids = ""
var vetor_tks = ""
// var qtd = 20000;
for (var i = 0; i < qtd; i++) {
    for (var j = 0; j < 13; j++) {
        newid += "" + parseInt(Math.random() * 10);
    }
    // console.log(newid, ("" + newid).length);
    vetor_ids += "\"" + newid + "\" ";
    newid = "127";
}
console.log("(" + vetor_ids + ")");

for (var i = 0; i < qtd; i++) {
    var old = token;
    var aux = token;
    for (var j = 0; j < maxupdates; j++) {
        var pos = parseInt(Math.random() * aux.length);
        var code = aux.charCodeAt(pos);
        // console.log(pos, token[pos], code);
        //numbers
        if (code >= 48 && code <= 57) {
            var newnumber = parseInt(Math.random() * ("" + Math.pow(10, ("" + aux[pos].length))));
            aux = aux.replaceAt(pos, newnumber);;
        }
    }
    vetor_tks += "\"" + aux + "\" ";
    // console.log(old === aux);
}
// console.log("(" + vetor_tks + ")");

