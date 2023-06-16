import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import validateFormData from '../../../utils/formDataValidation';
import TextInputField from './TextInputField';
import ButtonLoading from '../Button/Loading';

export default function BlogForm({ blog, option, mutation }) {
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
    };
    const errors = validateFormData(formData);
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      return;
    }
    mutation.mutate(formData);
  };
  console.log(blog);
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar>
          <BorderColorIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {option} Blog
        </Typography>
        {mutation.isError && (
          <Typography
            component="h1"
            variant="h5"
            style={{
              color: 'red',
            }}
          >
            {mutation.error.response.data.message}
          </Typography>
        )}
        <Box sx={{ mt: 1 }} component="form" onSubmit={handleSubmit}>
          <TextInputField
            label="Title"
            defaultValue={blog?.title}
            inputProps={{ style: { fontSize: 36 } }}
            sx={{ marginBottom: '1.4rem' }}
            error={validationErrors?.title}
          />

          <TextInputField
            multiline
            minRows={6}
            label="Description"
            defaultValue={blog?.description}
            inputProps={{ style: { fontSize: 18 } }}
            error={validationErrors?.description}
          />

          <ButtonLoading
            fullWidth={false}
            loading={mutation.isLoading}
            endIcon={<SaveIcon />}
            style={{ marginTop: '1.4rem', marginLeft: '8rem' }}
          >
            <span>Save</span>
          </ButtonLoading>

          <Button
            vavariant="outlined"
            style={{
              backgroundColor: '#e7e7e7',
              color: 'black',
              marginTop: '1.4rem',
              marginLeft: '1.8rem',
            }}
            onClick={(event) => {
              event.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
