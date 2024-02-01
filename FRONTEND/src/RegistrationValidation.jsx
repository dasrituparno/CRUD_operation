function Validation(values) {
    let errors = {};
  
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
    if (values.name === "") {
      errors.name = "Name should not be empty";
    } else {
      errors.name = "";
    }
  
    if (values.email === "") {
      errors.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "Invalid email";
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
    } else if (!password_pattern.test(values.password)) {
      errors.password = "Invalid password";
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
  
  