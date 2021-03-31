import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "@material-ui/core/Container";
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
function SignUp({history}) {
  const initialValues = {
    name:"",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = () =>
    Yup.object({
      name: Yup.string()
        .required("Required!").trim(),
      email: Yup.string()
        .email("Please enter valid email")
        .required("Required!"),
      password: Yup.string()
        .required("Required!")
        .min(6, "Password should contain minimum 6 characters"),
      confirmPassword: Yup.string()
        .required("Required!")
        .min(6, "Password should contain minimum 6 characters"),
    });

  const onSubmit = () => {
    if(formik.values.password===formik.values.confirmPassword){
      axios.post('https://mytodo-backend.herokuapp.com/sign-up', {
      name: formik.values.name,
      email: formik.values.email,
      password : formik.values.password
    },)

   //Alternate way of using fetch 
    // fetch('https://mytodo-backend.herokuapp.com/sign-up',{
    //   method:"POST",
    //   body:JSON.stringify({
    //       name: formik.values.name,
    //          email: formik.values.email,
    //          password : formik.values.password
    //      })
    //   ,
    //   headers:{
    //     "Content-Type":"application/json"
    //   },
    //   credentials:"include",
      
      
    // })
    .then(function (response) {
      history.push('/')
    })
    .catch(function (error) {
    });}
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
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            onBlur={formik.handleBlur("name")}
            onChange={formik.handleChange("name")}
            value={formik.values.name}
            helperText={formik.errors.name}
            error={formik.errors.name && formik.touched.name ? true : false}
          />
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confrimPassword"
            label="Confirm password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            onBlur={formik.handleBlur("confirmPassword")}
            onChange={formik.handleChange("confirmPassword")}
            value={formik.values.confirmPassword}
            helperText={formik.errors.confirmPassword}
            error={
              formik.errors.confirmPassword && formik.touched.confirmPassword ? true : false
            }
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
        <p>Already have account <Link to="/login">Login</Link></p>
      </div>
    </Container>
  );
}

export default SignUp;
