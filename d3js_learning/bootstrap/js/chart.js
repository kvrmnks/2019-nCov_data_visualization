function createChinaMap(TMD,map){
    d3.json(map,d=>mcreateMap(d));
    function mcreateMap(data) {
        var projection = d3.geoMercator().scale(700).translate([-900,800]);
        var geoPath = d3.geoPath().projection(projection);

        let color = d3.scaleOrdinal(d3.schemeCategory20b);
       // console.log(data);
        d3.select(TMD).selectAll('path').data(data.features)
            .enter().append('path').attr('d',geoPath).attr('fill',(d,i)=>color(i)).attr('stroke','black')
            .on('click',function (data,i) {
                if(this.style.fill === color(i)){
                    this.style.fill = 'red';
                }else{
                    this.style.fill = color(i);
                }
                console.log(data);
                console.log('/bootstrap/recourses/'+data.properties.name+'.geojson');
                createProvinceMap('#index_province_chart','/bootstrap/recourses/'+data.properties.name+'.geojson');
            });
        console.log(data.features);
        d3.select(TMD).append('g').selectAll('circle').data(data.features)
            .enter()
            .append('text')
            .attr('x',d=>geoPath.centroid(d)[0])
            .attr('y',d=>geoPath.centroid(d)[1])
            .attr('text-anchor','middle')
            .style('font-size','10px')
            .text(d=>convertType(d.properties.name));
    }
}
function createProvinceMap (TMD,map) {
    height = 700;
    width = 800;
    d3.json(map,function (data) {
        let projection = d3.geoMercator().scale(1200).translate([-900,800]);
        let geoPath = d3.geoPath().projection(projection);
        let color = d3.scaleOrdinal(d3.schemeCategory20b);
        d3.select(TMD).selectAll('g').remove();
        d3.select(TMD).selectAll('g').data(data.features)
            .enter().append('g').append('path').attr('d',geoPath).attr('fill',(d,i)=>color(i)).attr('stroke','black')
        let minX = 99999;let minY = 99999;
        let maxX = -99999; let maxY = -99999;
        d3.select(TMD).selectAll('path').each(function (d) {
            let cornor = geoPath.bounds(d);
            let x = cornor[0][0]; let y = cornor[0][1];
            let x1 = cornor[1][0]; let y1 = cornor[1][1];
            if(x < minX) minX = x; if(y < minY) minY = y;
            if(x1 > maxX) maxX = x1; if(y1 > maxY) maxY = y1;
        });
        let frac = width*2 / (maxX - minX);
        let frac2 = height*2 / (maxY - minY);
        if(frac > frac2) frac = frac2;
        frac *= 500;


        projection = d3.geoMercator().scale(frac).translate([-900,800]);
        geoPath = d3.geoPath().projection(projection);
        d3.select(TMD).selectAll('g').remove();
        d3.select(TMD).selectAll('g').data(data.features)
            .enter().append('g').append('path').attr('d',geoPath).attr('fill',(d,i)=>color(i)).attr('stroke','black')
        minX = 99999;minY = 99999;
        maxX = -99999; maxY = -99999;
        d3.select(TMD).selectAll('path').each(function (d) {
            let cornor = geoPath.bounds(d);
            let x = cornor[0][0]; let y = cornor[0][1];
            let x1 = cornor[1][0]; let y1 = cornor[1][1];
            if(x < minX) minX = x; if(y < minY) minY = y;
            if(x1 > maxX) maxX = x1; if(y1 > maxY) maxY = y1;
        });
        d3.select(TMD).selectAll('g').attr('transform','translate('+(-minX)+','+(-minY)+')');

        d3.select(TMD).selectAll('g').selectAll('text').data(data.features)
            .enter()
            .append('text')
            .attr('x',d=>geoPath.centroid(d)[0])
            .attr('y',d=>geoPath.centroid(d)[1])
            .attr('text-anchor','middle')
            .style('font-size','10px')
            .text(d=>convertType(d.properties.name));
    });
}
function convertType(province){
    if(province == '内蒙古自治区' || province == '黑龙江省')
        province = province.slice(0,3);
    else province = province.slice(0,2);
    return province;
}