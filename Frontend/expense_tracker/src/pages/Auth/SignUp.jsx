import AuthLayout from '../../components/layouts/AuthLayout'
import {useNavigate, Link} from 'react-router'
import Input from '../../components/inputs/input';
import {validateEmail} from '../../utils/helper.js'
import React, { useState }  from 'react'
import ProfilePictureSelector from '../../components/inputs/ProfilePictureSelector.jsx';
import { API_PATHS } from '../../utils/apiPaths.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { useContext } from 'react';
import { UserContext } from '../../context/userContex.jsx';
import uploadImage from '../../utils/uploadImage.js';

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    let profileImageUrl = "";

    if (!fullName) {
      setError("please enter user name")
      return;
    }
    if (!validateEmail(email)) {
      setError("please enter email");
      return;
    }
    if (!password) {
      setError("Please enter password");
      return;
    }

    setError("");

    try {

      if(profilePic){

        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || ""

      }
      
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl,
      })

      const { token , user } = response.data;

      if (token) {
        
        localStorage.setItem("token", token)
        updateUser(user)
        navigate('/dashboard')

      }

    } catch (error) {
      
      if (error.response && error.response.data.message) {

        setError(error.response.data.message);

      } else {

        setError("Something went wrong. Please try again.");

      }

    }
  }

  return (
    <AuthLayout>
      <div className='lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-bold text-black'>Create an account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below</p>

      <form onSubmit={handleSignUp}>

        <ProfilePictureSelector image={profilePic} setImage={setProfilePic} />

        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4'>
          
          <Input 
                value = {fullName}
                onChange = {({target}) => setFullName(target.value)}
                label = "Full Name"
                placeholder = "jhon"
                type = "text"
              />

          <Input 
                value = {email}
                onChange = {({target}) => setEmail(target.value)}
                label = "Email Adress"
                placeholder = "jhon@example.com"
                type = "text"
          />

          <div className='col-span-2'>
          <Input 
                value = {password}
                onChange = {({target}) => setPassword(target.value)}
                label = "Password"
                placeholder = "Min 8 characters"
                type = "password"
          />
          </div>

        </div>
        
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>
           SignUp
        </button>
        <p className='text-[13px] text-slate-800 mt-3'>
          You already have an account ?
        <Link className="font-medium text-primary underline px-2" to={"/login"}>Login</Link>
       </p>
      </form>
    </div>
    </AuthLayout>
  )
}

export default SignUp