function Validation(values){
    let error= {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (values.email ===""){
        error.mail = "email should not be empty"
    } else if(!email_pattern.test(values.email)){
        error.email="invalid email"
    }else{
        error.email=""
    }
    if (values.password ===""){
        error.mail = "password should not be empty"
    } else if(!password_pattern.test(values.password)){
        error.password="invalid password"
    }else{
        error.password=""
    }
    return error;


}
export default Validation;