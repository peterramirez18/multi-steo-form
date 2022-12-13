import * as yup from "yup"
export const personalInfoSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().required("Required"),
    phoneNumber: yup.number()
})