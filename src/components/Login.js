import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "@material-ui/core/Container";
import { addUser } from '../redux/actions/user';
import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import axios from 'axios'
import '../App.css'
import swal from 'sweetalert';
function Login() {
  const dispatch = useDispatch()
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = () =>
    Yup.object({
      email: Yup.string()
        .email("Please enter valid email")
        .required("Required!"),
      password: Yup.string()
        .required("Required!")
        .min(6, "Password should contain minimum 6 characters"),
    });

  const onSubmit = () => {
    axios.post('http://localhost:8080/login',
    {
      email: formik.values.email,
      password : formik.values.password
    })
    .then(function (response) {
      if(response.status==200){
      dispatch(addUser(formik.values))}
    })
    .catch((error)=> {
      swal({
        title: "Error",
        text: "Invalid Credentials",
        icon: "error",
        button: "Okay",
      })
      formik.resetForm()
    });
    
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onBlur={formik.handleBlur("email")}
            onChange={formik.handleChange("email")}
            value={formik.values.email}
            helperText={formik.errors.email}
            error={formik.errors.email && formik.touched.email ? true : false}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onBlur={formik.handleBlur("password")}
            onChange={formik.handleChange("password")}
            value={formik.values.password}
            helperText={formik.errors.password}
            error={
              formik.errors.password && formik.touched.password ? true : false
            }
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </form>
        <p>Don't have account <Link to="/sign-up">SignUp</Link></p>
      </div>
    </Container>
  );
}

export default Login;
