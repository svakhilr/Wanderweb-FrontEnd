import * as Yup from  'yup' 



const signupSchema = Yup.object().shape({
    profile_name: Yup.string().required("Required"),

    email:Yup.string().email("Please Enter a valid Email").required("Required"),
    password:Yup.string().min(6).required("Required"),
    confirmpassword:Yup.string().oneOf([Yup.ref('password'),null],"Password must Match")

});

export default signupSchema