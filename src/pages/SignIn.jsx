import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import OAuth from '../components/OAuth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Uh oh, bad user credentials')
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

            <div className='signInBar'>
              <p className='signInText'>Sign In</p>
              <button className='signInButton'>
                {<ArrowRightIcon fill='#ffffff' width='34px' height='34px' />}
              </button>
            </div>
          </form>
        </main>
        <OAuth />
        <div style={{ textAlign: 'center' }}>
          <Link
            to='/sign-up'
            className='registerLink'
            style={{ paddingBottom: '100px', display: 'inline-block' }}
          >
            Sign Up Instead
          </Link>
        </div>
      </div>
    </>
  )
}
export default SignIn
