import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import Legend from 'recharts/lib/component/Legend';
import {BarChart, Bar, XAxis, CartesianGrid, Tooltip} from 'recharts';
import {connect} from 'react-redux'
import {getActiveAllocations} from './selectors'
import * as R from 'ramda'
import chroma from 'chroma-js'

function SimpleChart(props) {
  console.log(props.allocations)
  if (props.allocations == 'no project selected'){
    return <div>
      -----
    </div>
  }else{
    
    const dataKeysl = [].concat.apply([],props.allocations)
    console.log(dataKeysl)
    console.log(R.flatten(dataKeysl.map(x=>Object.keys(x))))

    var dataKeys =  R.flatten(dataKeysl.map(x=>Object.keys(x)))
    dataKeys = [... new Set(dataKeys)]
    dataKeys = dataKeys.filter(x=>x!='name')
    console.log(dataKeys)

    // const dataKeys = [...new Set(...R.map(x=> Object.keys(x),props.allocations)))].filter(x=>x!='name')
    const colors = chroma.scale('RdYlBu').gamma(2).colors(dataKeys.length)
    return (
      <ResponsiveContainer width="99%" height={320}>
      <BarChart data={dataKeysl} barGap={0}>
        <XAxis dataKey="name" />
        {/* <YAxis /> */}
        {/* <CartesianGrid vertical={false} strokeDasharray="3 3" /> */}
        <Tooltip />
        <Legend />
          {dataKeys.map((key,index)=>{return <Bar type="monotone" dataKey={key} stackId="1" fill={colors[index]} stroke={colors[index]} />})}
      </BarChart>
    </ResponsiveContainer>
  );
}
}

const mapStateToProps = ( state) => {
  return {
    projects:state.projects,
    activeProject:state.activeProject,
    allocations:getActiveAllocations(state)
  }
}


// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     fetchProject:projectActionCreators.fetchOne,
//     fetchStaff:staffMemberActionCreators.fetchOne
//   }, dispatch)
// }

export default connect(mapStateToProps)(SimpleChart);


