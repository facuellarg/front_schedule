import React from 'react';
import ReactLoading from "react-loading";
import gif1 from './../../../images/gif1.gif'
import gif2 from './../../../images/gif2.gif'
import gif3 from './../../../images/gif3.gif'
import gif4 from './../../../images/gif4.gif'
import './Loading.css'
const list = [
    {
      prop: "balls",
      name: "Balls"
    },
    {
      prop: "bars",
      name: "Bars"
    },
    {
      prop: "bubbles",
      name: "Bubbles"
    },
    {
      prop: "cubes",
      name: "Cubes"
    },
    {
      prop: "cylon",
      name: "Cylon"
    },
    {
      prop: "spin",
      name: "Spin"
    },
    {
      prop: "spinningBubbles",
      name: "SpinningBubbles"
    },
    {
      prop: "spokes",
      name: "Spokes"
    }
];


const randomLoading= (list)=>{
    return list[Math.round(Math.random() * list.length)]
}
const Loading = props=>{
  const {show,message} = props
  const list_images=[
    gif1,
    gif2,
    gif3,
    gif4,
  ]
  
  if (show){
      return(
          <div className={'loading-container'}>
              <ReactLoading type={randomLoading(list).prop} color="rgb(148,180,56)" />
          <h1>{message}</h1>
              <img src={randomLoading(list_images)} alt="hacking"/>
          </div>
      )
  }else{
    return( <div display="none"></div>)
  }
}
Loading.defaultProps = {
  message: "Estamos hackeando la NASA para conseguir su horario, por favor espere",
};
export default Loading