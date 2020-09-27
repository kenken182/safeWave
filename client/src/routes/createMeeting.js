import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import superagent from 'superagent'
import { Redirect } from 'react-router-dom';
import firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.h
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alreadyHave: {
      marginBottom: '50px'
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [organizer, setOrganizer] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [redirect, setRedirect] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    var user = firebase.auth().currentUser;
    const data = {
      title: title,
      description: description,
      userId: user.uid,
      organizer: organizer,
      latitude: latitude,
      longitude: longitude,
    }
    superagent
      .post(`${process.env.REACT_APP_BACK_END_URL}/meetings/create`)
      .send(data) // sends a JSON post body
      .set('X-API-Key', 'foobar')
      .set('accept', 'json')
      .end((err, res) => {
      if (res.status === 200) {
          alert('You have created a meeting')
          setRedirect(true)
        }
      });
  }
  if (redirect) {
    return (
      <Redirect to='/home'/>
    )
  }
  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Meeting
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Title"
                label="Title"
                value={title}
                onInput={ e=>setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Description"
                value={description}
                onInput={ e=>setDescription(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Organizer"
                value={organizer}
                onInput={ e=>setOrganizer(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Latitude"
                value={latitude}
                onInput={ e=>setLatitude(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Longitude"
                value={longitude}
                onInput={ e=>setLongitude(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{marginTop: '10px'}}
          >
            Create
          </Button>
          <Grid container className={classes.alreadyHave} justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}