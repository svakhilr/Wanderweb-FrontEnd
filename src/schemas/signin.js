import * as Yup from  'yup'

const signInschema = Yup.object().shape({
    email:Yup.string().email("Please Enter a valid Email").required("Required"),
    password:Yup.string().required("Required"),

})

export default signInschema