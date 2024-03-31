import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert2';
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
        justifyContent: 'center',
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

export default function SignIn() {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${BASE_URL}api/loginAdmin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            swal.fire(
                'Success',
                'Login success',
                'success'
            );
            navigate('/dashboard');
        } else {
            swal.fire(
                'Failed',
                data.message,
                'error'
            );
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.root}>
                <Paper className={classes.outerPaper}>
                    <div className={classes.paper}>
                        <img src="/images/ll.png" alt="Logo" className={classes.logo} style={{ width: '15em' }} />

                        <form className={classes.form} onSubmit={handleSubmit}>
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
                                onChange={e => setUsername(e.target.value)}
                                size="small" // Add this
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
                                size="small"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Masuk
                            </Button>
                        </form>
                    </div>
                </Paper>
            </div>
        </Container>
    );
}
