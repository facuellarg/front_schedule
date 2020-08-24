import React from 'react';
import './HeaderCell.css'
const HeaderCell =(props)=>{
    const {day,style} = props
    return(
        <div className="header_cell" style={style}>
        <span >{day}</span>
        </div>
        
    )
}

export default HeaderCell