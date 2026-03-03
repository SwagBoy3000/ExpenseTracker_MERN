import AuthLayout from '../../components/layouts/AuthLayout'
import {useNavigate, Link} from 'react-router'
import Input from '../../components/inputs/input';
import {validateEmail} from '../../utils/helper.js'
import React, { useState }  from 'react'

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {

    

  }

  return (
    <div>SignUp</div>
  )
}

export default SignUp