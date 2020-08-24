import React ,{useState}from 'react';
import Panel from './Panel'
import Loading from './Loading'
import logo_unal from './../../images/logo_unal.png'
import './WelcomePage.css'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
   
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




const WelcomePage = (props)=>{
    const classes = useStyles();
    const[schedule, set_schedule] = useState(null);
    const[loading, set_loading] = useState(false);
    const[show_background, set_show_background] = useState(true);
    const[cell_colored, set_cell_colored] = useState(true);
    // const url ='http://127.0.0.1:5000'
    const url ='https://still-harbor-73940.herokuapp.com'
    let user,password;
    const FecthSchedule = (user,password)=>{
      if (user !== undefined && password !==undefined){
        fetch(`${url}/scheduler?user=${user.value}&password=${password.value}`)
        .then(res => {
            
            return(res.json())
        })
        .then(
          (result) => {
            if (result['status'] === 200){
              set_schedule(result['data'])
              set_loading(false)
            }else if (result['status'] === 102){
              set_loading(true)
            }else{
              set_loading(false)
            }
          },
          // Nota: es importante manejar errores aquí y no en 
          // un bloque catch() para que no interceptemos errores
          // de errores reales en los componentes.
          (error) => {
            console.log(error)
            set_loading(false)
          }
        )
      }
      
    }
    // const FetchPendingList =(user)=>{
    //   fetch(url)
    //   .then(res => {
    //       return(res.json())
    //   })
    //   .then(
    //     (result) => {
    //       if (user in Object.keys(result)){

    //       }

    //     },
    //     // Nota: es importante manejar errores aquí y no en 
    //     // un bloque catch() para que no interceptemos errores
    //     // de errores reales en los componentes.
    //     (error) => {
    //       console.log(error)
    //       set_loading(false)
    //     }
    //   )
    // }



  

    const onOnClickGetSchedule =(event)=>{
        event.stopPropagation();
        event.preventDefault();
        if (user.value || password.vaue){
          
          set_loading(true)
          FecthSchedule (user,password)
        }
    }

        
            if (schedule){
                return (
                    <div className='panel-container-w'> 
                {/* <button onClick={()=>set_show_background(!show_background)}>{show_background?'quitar fondo':'poner fondo'}</button> */}
                      <Button
                        disabled={loading}
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={()=>set_show_background(!show_background)}
                        >
                        {show_background?'Quitar Fondo':'Poner Fondo'}
                      </Button>
                        <Button
                          disabled={loading}
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={()=>set_cell_colored(!cell_colored)}
                          >
                        {cell_colored?'Quitar Color Celdas':'Poner color Celdas'}
                        </Button>
             
                    <Panel schedule={schedule} background={show_background} cell_colored={cell_colored}></Panel>
                    </div>
     
                );
            }else{
                if (loading){
                  setInterval(() => {
                    if (user != null && password != null){
                      FecthSchedule(user,password)
                    }
                  }, 20000);
                
                }
                return( 
                <Container component="main" maxWidth="xs">
                    <Loading show={loading}></Loading>
                    <CssBaseline />
                    <div className={classes.paper}>
                    <Avatar className={classes.avatar} src={logo_unal}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Horario UNAL
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="user"
                        label="Usuario Unal"
                        name="username"
                        autoComplete="off"
                        inputRef={(u) => user = u}
                        autoFocus
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={(p) => password = p}
                        />
                        <Button
                        disabled={loading}
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={onOnClickGetSchedule}
                        >
                        Cargar mi Horario
                        </Button>
                    </form>
                    </div>
                    <Box mt={8}>
                    <Copyright />
                    </Box>
                </Container>
                )
            }
           
        
        
    
}
export default WelcomePage


