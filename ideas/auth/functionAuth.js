import axios from "axios";
import decode from "jwt-decode";


//Registeration function need to be imported 
export const register = newUser => {
  return axios
    .post("/api/v1/users/register", newUser)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

//Login function need to be imported 

export const login = user => {
  return axios
    .post("/api/v1/users/login", user)
    .then(res => {
      console.log(res.data.token);
      localStorage.setItem("usertoken", res.data.token);
      return res.data.token;
    })
    .catch(err => console.log(err));
};

//Check token and token expiry function need to be imported 

export const checkAuth = async (props) => {
  var dateNow = new Date();
  if (!localStorage.usertoken) {
    props.history.push("/login");
    console.log("offline");
  } else {
    const token = localStorage.getItem("usertoken");
    var decodedToken = await decode(token);
    var exp = decodedToken.exp
    if (exp < (dateNow.getTime()/1000)) {
      localStorage.removeItem("usertoken")
      console.log("hello");
      props.history.push("/login");
    }
  }
};
