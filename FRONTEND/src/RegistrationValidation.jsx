function Validation(values) {
    let errors = {};
  

  
    if (values.name === "") {
      errors.name = "Name should not be empty";
    } else {
      errors.name = "";
    }
  
    if (values.email === "") {

      errors.email = "email should not be empty";
    } else {
      errors.email = "";
    }
  
    if (values.phone === "") {
      errors.phone = "Number should not be empty";
    } else {
      errors.phone = "";
    }
    if (values.address === "") {
      errors.address = "enter your address";
    } else {
      errors.address = "";
    }
  
    if (values.password === "") {
      errors.password = "Password should not be empty";
    } else {
      errors.password = "";
    }
  
    if (values.confirmpassword === "") {
      errors.confirmpassword = "Confirmation password should not be empty";
    } else if (values.confirmpassword !== values.password) {
      errors.confirmpassword = "Passwords do not match";
    } else {
      errors.confirmpassword = "";
    }
  
    return errors;
  }
  
  export default Validation;
  
  