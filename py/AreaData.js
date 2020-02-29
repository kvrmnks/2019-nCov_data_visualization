var d3 = require("d3");
var fs = require("fs");
var data = fs.readFileSync('DXYArea.csv','utf8');
//console.log(data.toString());
/*
const parse = require('csv-parse/lib/sync');
const records = parse(data, {
    columns: true,
    skip_empty_lines: true
  })
  
console.log(records);
*/
function readText(pathname) { //去除utf-8 BOM的文本文件读取
    var bin = fs.readFileSync(pathname);

    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }

    return bin.toString('utf-8');
}
var rawData = d3.csvParse(readText('DXYArea.csv'));
var ret = [];
for(let i in rawData){
    //console.log(rawData[i]);
    if(typeof(rawData[i].updateTime) == 'undefined')continue;
    //console.log(tmp);
    var tmp = {
        provinceName: rawData[i]['provinceName'],
        cityName: rawData[i].cityName,
        province_confirmedCount: rawData[i].province_confirmedCount,
        province_curedCount: rawData[i].province_curedCount,
        province_deadCount: rawData[i].province_deadCount,
        city_confirmedCount: rawData[i].city_confirmedCount,
        city_curedCount: rawData[i].city_curedCount,
        city_deadCount: rawData[i].city_deadCount == '2990' ? '0' : rawData[i].city_deadCount,
        updateTime: rawData[i].updateTime.slice(0,10)
    };
    if(tmp.updateTime != '')
        ret.push(tmp);
}
//console.log(rawData);
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'Area.csv',
    header: [
        {id: 'provinceName', title: 'provinceName'},
        {id: 'cityName', title: 'cityName'},
        {id: 'province_confirmedCount', title: 'province_confirmedCount'},
        {id: 'province_curedCount', title: 'province_curedCount'},
        {id: 'province_deadCount', title: 'province_deadCount'},
        {id: 'city_confirmedCount', title: 'city_confirmedCount'},
        {id: 'city_curedCount', title: 'city_curedCount'},
        {id: 'city_deadCount', title: 'city_deadCount'},
        {id: 'updateTime', title: 'updateTime'}
    ]
});
//fs.writeFileSync('Area2.csv','\uFEFF');
csvWriter.writeRecords(ret)       // returns a promise
    .then(() => {
        console.log('...Done');
        var data = fs.readFileSync('Area.csv','utf8');
        fs.writeFileSync('Area2.csv','\uFEFF'+data.toString());
        //console.log(data);
    });

