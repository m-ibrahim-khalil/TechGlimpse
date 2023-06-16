import Avatar from '@material-ui/core/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';
import { signIn } from '../../features/authSlice';
import { login } from '../../services';
import { ButtonLoading } from '../common/Button';
import { PasswordInputField, TextInputField } from '../common/Form';
import validateFormData from '../../utils/formDataValidation';
import { getAuthUsername } from '../../utils/jwt';

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
    margin: theme.spacing(3, 0, 2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [validationErrors, setValidationErrors] = useState({});
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const loginUserMutation = useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      console.log('success mutation', variables);
      queryClient.setQueryData(['login', data.username], data);
      queryClient.invalidateQueries(['login'], { exact: true });
      dispatch(signIn({ authUser: getAuthUsername() }));
      navigate('/');
    },
  });

  const handleSubmit = (e) => {
    console.log('signin submit');
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const errors = validateFormData(formData);
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      return;
    }
    loginUserMutation.mutate(formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {loginUserMutation.isError && (
          <Typography
            component="h1"
            variant="h5"
            style={{
              color: 'red',
            }}
          >
            {loginUserMutation.error.response.data.message}
          </Typography>
        )}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextInputField
                label="User Name"
                error={validationErrors?.username}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordInputField error={validationErrors?.password} />
            </Grid>
            <Grid item xs={12}>
              <ButtonLoading
                loading={loginUserMutation.isLoading}
                endIcon={<LoginIcon />}
              >
                <span>Sign In</span>
              </ButtonLoading>
            </Grid>
          </Grid>
        </form>
        <Grid container justifyContent="center">
          <Grid item>
            <Link to="/signup" variant="body2">
              Don&#39;t have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
