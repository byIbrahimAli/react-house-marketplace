import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import OAuth from '../components/OAuth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value, // updates whatever id was in target, smart!
      // why is id in []?
      // when using a dynamic value as a property name, you gotta use []
      // tells JS to evaluate expression inside brackets and use result as property name
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      // registering user
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredentials.user

      // updating display name
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      // over in firebase, without this users would only exist in the 'Authentication' tab
      // but your users wouldn't be in a 'Firestore Database'
      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('My bad, something went wrong with registering you')
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              className='nameInput'
              placeholder='Name'
              id='name'
              value={name}
              onChange={onChange}
            />
            <input
              type='email'
              className='emailInput'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />

            <div className='passwordInputDiv'>
              <input
                type={showPassword ? 'test' : 'password'}
                className='passwordInput'
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}
              />

              <img
                src={visibilityIcon}
                alt='show password'
                className='showPassword'
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot Password?
            </Link>

            <div className='signUpBar'>
              <p className='signUpText'>Sign Up</p>
              <button className='signUpButton'>
                {<ArrowRightIcon fill='#ffffff' width='34px' height='34px' />}
              </button>
            </div>
          </form>
        </main>
        <OAuth />
        <div style={{ textAlign: 'center' }}>
          <Link
            to='/sign-in'
            className='registerLink'
            style={{ paddingBottom: '100px', display: 'inline-block' }}
          >
            Sign In Instead
          </Link>
        </div>
      </div>
    </>
  )
}
export default SignUp
