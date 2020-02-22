function soccerViz(){
    d3.csv('worldcup.csv',d=>viz(d));

    function viz(data){
        console.log(data);
        createElement(data);
        createButtons(data);
        bind();
        d3.text('resources/infobox.html',d=>{
            console.log(d);
            d3.select('body').append('div')
                .attr('id','infobox')
                .html(d);
        });
        d3.selectAll('.groups')
            .on('click',d=>{
                d3.selectAll('td.data')
                .data(Object.values(d))
                .html(d=>d);
                //console.log('2333');
            });
    }
    function bind(){
        d3.selectAll('.groups')
            .on('mouseover',changeCircle)
            .on('mouseout',rechangeCircle);
    }
    function createElement(data){
        groups = d3.select('svg').append('g')
                    .attr('transform','translate(25,250)')
                    .selectAll('g')
                    .data(data)
                    .enter()
                    .append('g')
                    .attr('class','groups')
                    .attr('transform',(d,i)=>'translate('+i*50+',0)');
        groups.append('circle')
                .attr('r','15');
        groups.append('text')
                .attr('y','30')
                .text(d=>d.team);
    }
    function createButtons(data){
        keys = d3.keys(data[0]).filter((d)=> d!='region' && d!='team');
        d3.select('#controls').selectAll('button')
            .data(keys).enter()
            .append('button')
            .html(d=>d)
            .on('click',d=>buttonClicked(d));
        function buttonClicked(tag){
            let Max = d3.max(data,d=>parseFloat(d[tag]));
            let sizeScale = d3.scaleLinear().domain([0,Max]).range([5,15]);
            d3.selectAll('.groups').select('circle')
                .transition().duration(500)
                .attr('r',d=>sizeScale(parseFloat(d[tag])));
        }
    }
    function changeCircle(data){
        d3.select(this).select('text')
            .classed('active',true).attr('y',10);
        d3.selectAll('.groups').select('circle')
            .classed('active',d=>d.region == data.region)
            .classed('inactive',d=>d.region != data.region);
        //this.parentElement.appendChild(this);
        d3.select(this).raise();
    }
    function rechangeCircle(data){
        d3.select(this).select('text').attr('y',30);
        d3.selectAll('.groups').select('circle')
            .classed('active',false).classed('inactive',false);
        d3.selectAll('.groups').select('text')
            .classed('active',false);        
    }

}