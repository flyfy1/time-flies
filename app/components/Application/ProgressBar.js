import React from 'react';

function compute_percentage(start, end, progress){
  return (progress.getTime() - start.getTime()) / (end.getTime() - start.getTime())
}

export default class extends React.Component{
  render(){
    const {start, end, progress} = this.props

    if(start && end && progress){
      const percentage = compute_percentage(start, end, progress)
      const percentage_text = percentage * 100 + '%'

      return (
        <div style={{width: '100%', border: '1px solid black', position: 'relative'}} >
          <div style={{textAlign: 'center', width: '100%', zIndex: '10', position: 'relative'}}>{percentage_text }</div>
          <div style={{position: 'absolute', height: '100%', width: percentage_text, backgroundColor: 'green', top: 0}}></div>
        </div>
      )
    } else{
      return (
        <div style={{width: '100%', border: '1px solid black', position: 'relative'}} >
          <div style={{textAlign: 'center', width: '100%', zIndex: '10', position: 'relative'}}>Please Set Value First</div>
        </div>
      )
    }
  }
}

