import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';


import { useNavigate } from 'react-router-dom';
const { BASE_URL } = require('../configapi');

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Full width
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logo: {
        marginBottom: theme.spacing(2), // Add some space between the logo and the form
    },
    outerPaper: {
        padding: theme.spacing(2),
        border: '1px solid #ccc',
        borderRadius: theme.spacing(1),
    },
}));

async function loginUser(credentials) {
    const response = await fetch(`${BASE_URL}api/loginAdmin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    if (response.status === 200) {
        return response.json();
    } else {
        throw new Error('Failed to login');
    }
}

export default function SignIn() {
    const classes = useStyles();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await loginUser({
                username,
                password
            });
            swal("Success", response.message, "success", {
                buttons: false,
                timer: 2000,
            })
            .then((value) => {
                localStorage.setItem('accessToken', response['accessToken']);
                localStorage.setItem('user', JSON.stringify(response['user']));
                setTimeout(() => {
                    navigate('/dashboard');
                }, 500); // Delay for 100ms
            });
        } catch (error) {
            swal("Failed", "Failed to login", "error");
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.root}>
                <Paper className={classes.outerPaper}>
                    <div className={classes.paper}>
                        <img src="/logoSMA.png" alt="Logo" className={classes.logo} width={140} />

                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                placeholder='Username'
                                required
                                fullWidth
                                id="username"
                                name="username"
                                autoComplete="username"
                                value={username}
                                onChange={e => setUserName(e.target.value)}
                                inputProps={{
                                    style: { height: '2px' }, // Ubah tinggi sesuai kebutuhan
                                }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                placeholder='Password'
                                required
                                fullWidth
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                inputProps={{
                                    style: { height: '2px' }, // Ubah tinggi sesuai kebutuhan
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"

                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </form>
                    </div>
                </Paper>
            </div>
        </Container>
    );
}
