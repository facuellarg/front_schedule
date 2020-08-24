import React from 'react';
import './Cell.css'


// const invertHex= hex => {
//     return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
// }
  
const adjust =(color, amount)=> {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}
const backgroundStyle =(color, color_opacity)=>{
    return(
        {
            // background: color,
            background: `linear-gradient(180deg, ${color}${color_opacity} 10%, ${adjust(color,50)} 95%)`,
            // color:`#${invertHex(color.replace('#',''))}`,
        }
    )
}


const default_color ={
    background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(60,60,60,0.9) 64%)'
}
const Cell = (props) =>{
    // const{group, professor, name, classroom,style,color,color_opacity, hour}=props;
    const{ name, classroom,style,color,color_opacity,cell_colored}=props;
    
    // console.log(invertHex(color.replace('#','')))
    const cell_color = cell_colored ? backgroundStyle(color,color_opacity): default_color;
    return(
        <div className={"cell-container item"} style={{...style,...cell_color}}>
            <span className={'name'}>{name}</span>
            {/* <span className={'professor'}>{professor}</span> */}
            <span className={'classroom'}>Salon:{classroom}</span>
            {/* <span className={'group'}>Grupo:{group}</span> */}
            {/* <span className={'hour'}>Hora:{hour}</span> */}
            
        </div>
    )
}
export default Cell;