function load() {
    d3.json('../recourses/Province.json',loadProvince);
    function loadProvince(data){
        //console.log(data);
        d3.select('#data_menu').selectAll('li').data(d3.keys(data)).enter()
            .append('li').append('a').attr('href','#').html(d=>d)
            .attr('onclick','shows($(this).text()),showDataByProvince(this.text)');
        //console.log(d3.select('#data_menu'));
    }
}
var gDataPageRawData = null;
var gDataPageGroupedData = null;
function showDataByProvince(province){
    if(gDataPageRawData == null) d3.csv('../recourses/DXYArea.csv',d=>analysisData(d,province));
    else{
        analysisData(gDataPageRawData,province);
    }
}

function convertType(province){
    if(province == '内蒙古自治区' || province == '黑龙江省')
        province = province.slice(0,3);
    else province = province.slice(0,2);
    return province;
}

function convertTime(time){
    let cur = new Data(time);
    return cur.getTime();
}

function analysisData(data,province){
    gDataPageRawData = data;
    if(gDataPageGroupedData == null){
        gDataPageGroupedData = d3.nest().key(d=>convertType(d.provinceName)).entries(data);

    }
/*    console.log(province);
    console.log(gDataPageGroupedData);*/
    //console.log(gDataPageGroupedData.get(province));
    for(x in gDataPageGroupedData){
        if(gDataPageGroupedData[x].key === province){
            updateTable(gDataPageGroupedData[x]);
            //console.log(gDataPageGroupedData[x]);
        }
    }
}

function updateTable(data){
    data = d3.nest().key(d=>d.cityName).entries(data.values);
    console.log(data);
    d3.select('#data_tbody').selectAll('tr').remove();
    d3.select('#data_tbody').selectAll('tr').data(data).enter().append('tr');
    let Tr = d3.select('#data_tbody').selectAll('tr');
    Tr.append('td').classed('text-center',true).html(d=>d.values[0].cityName);
    Tr.append('td').classed('text-center',true).html(d=>d.values[0].city_confirmedCount);
   // Tr.append('td').html(d=>d.values[0].city_suspectedCount);
    Tr.append('td').classed('text-center',true).html(d=>d.values[0].city_deadCount);
    Tr.append('td').classed('text-center',true).html(d=>d.values[0].city_curedCount);
    for(x in data) {
        cur = '';
        let tmp = data[x].values[0];
        cur += tmp.cityName + ' ';
        cur += tmp.city_confirmedCount + ' ';
        cur += tmp.city_curedCount + ' ';
        cur += tmp.city_deadCount + ' ';
        cur += tmp.city_suspectedCount + ' ';
        console.log(cur);
    }
}