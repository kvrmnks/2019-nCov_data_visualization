function createSoccerViz(){
    console.log('23');
    d3.csv('worldcup.csv',d=>overallTeamViz(d));
    function overallTeamViz(data){
        console.log(data);
        d3.select('svg')
          .append('g')
          .attr('transform','translate(50,250)')
          .selectAll('g')
          .data(data)
          .enter()
          .append('g')
          .attr('class','overall')
          .attr('transform',(d,i)=>'translate('+i*50+',0)');
        overall = d3.selectAll('.overall');
        overall.append('circle')
               .attr('r',20);
        overall.on('mouseover',changeRegion)
        overall.append('text')
               .attr('y',30)
               .text((d)=>d.team);
        const keys = Object.keys(data[0]).filter((d) => d!='team' && d!='region');
        console.log(keys);
        d3.select('#controls')
            .selectAll('button')
            .data(keys)
            .enter()
            .append('button')
            .html(d=>d)
            .on('click',buttonClick);
        var RawData = data;
        function buttonClick(key){
            let Max = d3.max(RawData,(d)=>parseFloat(d[key]));
            let rScale = d3.scaleLinear().domain([0,Max]).range([2,20]);
            let colorScale = d3.scaleLinear().domain([0,Max]).range(['yellow','blue']);
            d3.selectAll('g.overall')
                .selectAll('circle').transition().duration(1000)
                .attr('r',d=>{return rScale(d[key])})
                .style('fill',d=>colorScale(d[key]));
        }
        function changeRegion(region){
            region = region.region;
            d3.selectAll('g.overall')
                .selectAll('circle').transition().duration(1000)
                .attr('class',(d)=>d.region == region ? "active" : "");
        }
        function changeAllRegin(data){
            d3.selectAll('g.overall')
                .selectAll('circle')
                .attr('class',"inactive");
        }
    };
};