import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { GoogleLogin } from 'react-google-login';
import Icon from "./Icon";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from "./Input";



const Auth = () => {
    const classes = useStyles();

    const { showPassword, setShowPassword } = useState(false);

    const { IsSignUp, setIsSignUp } = useState(false);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword
    );

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };
    
    // switch to change between Sign In and Sign Up forms //
    const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
    };
    

    const googleSuccess = async (res) => {
        console.log(res);
    };

    const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try again later");
    };


    return (
        <Container component="main" maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{IsSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {                    // Implemented ternary for the sign up form //
                            IsSignUp && (
                                <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} 
                        />
                        {
                            IsSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> 
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {                    // Implemented ternary for sign in/sign up forms  //
                            IsSignUp ? "Sign Up" : "Sign In"
                        }
                    </Button>
                    <GoogleLogin
                        clientId="194753385148-8hjvnjk0n2i9l4l3sa4cukr8sgi6bhti.apps.googleusercontent.com"
                        render={(renderprops) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderprops.onClick} disabled={renderprops.disabled} startIcon={<Icon />} variant="contained" >
                                Google Sign In
                            </Button>
                        )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}> 
                            {
                                IsSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"
                            }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;