import Avatar from '@material-ui/core/Avatar';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Container, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { TextInputField } from '../common/Form';
import { ButtonOutlined } from '../common/Button';
import validateFormData from '../../utils/formDataValidation';
import { updateUserByUsername } from '../../services';
import { logout } from '../../features/authSlice';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UpdatePassword() {
  console.log('Update Password Component');
  const classes = useStyles();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const { username } = useParams();
  const queryClient = useQueryClient();
  const updatePasswordMutation = useMutation({
    mutationFn: (data) => updateUserByUsername(username, data),
    onSuccess: (data) => {
      console.log('success mutation');
      dispatch(logout());
      queryClient.setQueryData(['update-password', data], data);
      queryClient.invalidateQueries(['login', username]);
      navigate('/');
    },
    onError: (err) => {
      console.log('On Error', err);
      if (err.response.data.message === 'jwt expired') {
        dispatch(logout());
        navigate('/');
      }
    },
  });

  const handleSubmit = (e) => {
    console.log('signup submit');
    e.preventDefault();
    const formData = {
      oldPassword: e.target.oldpassword.value,
      newPassword: e.target.newpassword.value,
    };
    console.log(formData);
    const errors = validateFormData(formData);
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      return;
    }
    updatePasswordMutation.mutate(formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BorderColorIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Password
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          style={{
            color: 'red',
          }}
        >
          {updatePasswordMutation?.error?.response?.data?.message}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextInputField
                label="Old Password"
                type="password"
                error={validationErrors?.oldPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInputField
                label="New Password"
                type="password"
                error={validationErrors?.oldPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <ButtonOutlined>Update</ButtonOutlined>
              <ButtonOutlined
                onClick={(event) => {
                  event.preventDefault();
                  navigate(-1);
                }}
              >
                Cancel
              </ButtonOutlined>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
