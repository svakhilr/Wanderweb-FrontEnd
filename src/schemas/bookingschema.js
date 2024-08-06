import * as Yup from  'yup'

const bookingSchema = Yup.object().shape({
    bookername:Yup.string().required("Required"),
    email:Yup.string().email("Please Enter a valid Email").required("Required"),
    startingdate:Yup.string().required("Required"),
    contactnumber:Yup.string().min(10).required("Required")
})

export default bookingSchema