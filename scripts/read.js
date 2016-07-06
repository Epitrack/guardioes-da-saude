var fs = require('fs');
fs.readFile('FINAL STRINGS_PT_EN_ES_CHI_FRA 04072016.csv', function(err, data) {
    console.log(data.toString('utf-8'));
});
