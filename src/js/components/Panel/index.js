import React ,{ useState, useEffect } from 'react';
import Cell from './../Cell'
import HeaderCell from './../HeaderCell'
import './Panel.css'
import image_background from './../../../images/background.jpg'




const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


const useWindowDimensions =()=> {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


const get_color_schedule = (schedule,color_course)=>{
  Object.keys(schedule).map( code =>{
    let color = schedule[code]['color']
    color_course[code] = color
    delete schedule[code]['color']
    return true
  })
  return color_course

}

const percentage_to_hex = number=>{
  number =  Math.round((255*number))
  return number.toString(16).toUpperCase();
}


const Panel =(props)=>{
  const {schedule,background,cell_colored} = props
  const days =['lunes','martes','miercoles','jueves','viernes','sabado']
  const { width } = useWindowDimensions();
  let color_course={};
  let schedule_copy = JSON.parse(JSON.stringify(schedule))
  const get_hour_interval=(schedule)=>{
      let max = 0
      let min = 25 
      Object.keys(schedule).map( code=>{
        Object.keys(schedule[code]).map( day=>{
      
          let hour = schedule[code][day]['hour']
          let start_hour = hour[0].split(':')[0]
          let end_hour = hour[1].split(':')[0]
          if( min > start_hour){
            min = start_hour
          }
          if( max < end_hour){
            max = end_hour
          }     
          return ""
        })
        return ""
      })
      return {'min':min,'max':max}
  }




  const gradient_time = (<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor:'rgb(100,100,100)',stopOpacity:.8}} />
                      <stop offset="100%" style={{stopColor:'rgb(180,180,180)',stopOpacity:.5}} />
                    </linearGradient>)
  const gradient_day = (<linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor:'rgb(100,100,100)',stopOpacity:.5}} />
       <stop offset="100%" style={{stopColor:'rgb(180,180,180)',stopOpacity:.2}} />
          </linearGradient>
)

    const jsUcfirst= (string) => {return(string.charAt(0).toUpperCase() + string.slice(1))}
    const normalize = word=> word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    color_course = get_color_schedule(schedule_copy,color_course)
    const {min, max} = get_hour_interval(schedule_copy)
    const rows = (max - min)

    const backgroud_style = background ?{ backgroundImage: `url(${image_background})`} :{ backgroundColor:'black'}
    
    return(
        <div className={'panel-container'} style={{...{gridTemplateRows: `repeat(${rows+1}, auto)`},...backgroud_style}}>
          {/* Columna de horas */}
           <svg style={{height:'100%',width:"100%",gridRow:`1 / span ${rows+1}`, gridColumn:1,margin:0,padding:0}}>
              {gradient_day}
              {gradient_time}
              <rect className={'rectangle'} width="100%" height="100%" style={{fill:`url(#${gradient_time.props['id']})`}}  />
          </svg>
          <HeaderCell day={'Hora'}  style={{gridColumn:1, gridRow:1}}></HeaderCell>
          
          {/* Fila de  dias  */}
          {days.map( (day,key)=>{
            return(
              <svg key={key} style={{height:'100%',width:"100%",gridRow:`1 / span ${rows+1}`, gridColumn:key+2,margin:0,padding:0}}>
                <rect className={'rectangle'} width="100%" height="100%" style={{fill:`url(#${gradient_day.props['id']})`}}  />
              </svg>)
          })}
          
          {days.map( (day,key)=>{
            return(
            <HeaderCell day={jsUcfirst(day)} style={{gridRow:1,gridColumn:key+2}} key={key}></HeaderCell>)}
          )}

        {/* las horas */}
          {[...Array(rows).keys()].map( (val,key)=>{
          return(
            <HeaderCell day={parseInt(min)+val} 
                        key={key}
                        style={{gridRow:`${val+2}`,
                                gridColumn:1,
                                }}>
                        </HeaderCell>
          )
          })}
          {[...Array(rows).keys()].map( (val,key)=>{
          return(
            <svg key={key} style={{gridColumn:"1 / span 7", gridRow:`${val+2}`}} height="100%" width="100%">
              <line x1="0" y1="100%" x2={width} y2="100%" style={{stroke:"rgba(219,219,219,0.9)",strokeWidth:2}} />
          </svg>
          )
          })}
        {/* Informacion de las materias */}
        {Object.keys(schedule_copy).map( (code) =>{
            return(
                Object.keys(schedule_copy[code]).map( (day,key)=>{
                
                  const{name,group,classroom,professor,hour} =schedule_copy[code][day]
                  const column = days.findIndex(element=>element === normalize(day))+2
                  const start_hour = parseInt(hour[0].split(':')[0])
                  const end_hour = parseInt(hour[1].split(':')[0])
                  const size = end_hour-start_hour
                  return(
                    <Cell key={key}
                    name={name}
                    group={group}
                    professor={professor}
                    classroom={`${classroom[0]}-${classroom[1]}`}
                    hour={`${hour[0]}-${hour[1]}`}
                    color={`${color_course[code]}`}
                    color_opacity={`${percentage_to_hex(.9)}`}
                    cell_colored={cell_colored}
                    style={{
                            
                            gridColumn:column,
                            gridRow:`${start_hour-min+2} / span ${size}`,
                          }}>
                    </Cell>
                  )
                }
                  
                )
            )
        })
        }
        {/*Separador TODO:Cambiar estilos para diferencias*/}
          <svg style={{marginBottom:"3%",gridColumn:"1 / span 7", gridRow:1}} height="100%" width="100%" >
            <line x1="0" y1="100%" x2={width} y2="100%" style={{ stroke:"rgba(219,219,219,0.9)",strokeWidth:2}} />
          </svg>
          </div>
    )
}

export default Panel