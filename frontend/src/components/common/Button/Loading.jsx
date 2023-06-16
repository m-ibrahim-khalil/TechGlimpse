import LoadingButton from '@mui/lab/LoadingButton';

function ButtonLoading({ loading, children, ...rest }) {
  return (
    <LoadingButton
      type="submit"
      fullWidth
      color="primary"
      variant="contained"
      loading={loading}
      loadingPosition="end"
      {...rest}
    >
      {children}
    </LoadingButton>
  );
}

export default ButtonLoading;
