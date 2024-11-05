import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  const {register, handleSubmit, formState:{
      errors
  }} = useForm();

  const {signin, isAuthenticated, errors: signinErrors} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/products')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(data=>{
    signin(data)
  })

    return (
      <main class="pa7 black-80">
            {
                signinErrors.map((error, i) => (
                    <div className='bg-red-500 text-center text-white' key={i}>
                        {error}
                    </div>
                ))
            }
            <form class="measure center" onSubmit={onSubmit}>        
              <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                <legend class="f4 fw6 ph0 mh0">Ingresa tus datos</legend>
                <div class="mt3">
                  <label class="db fw6 lh-copy f6" for="email-address">Email</label>
                  <input 
                            type="email" {...register("email", {required: true})}
                            className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                            placeholder='Email'
                        />
                        {
                            errors.email && (
                                <p className='text-red-500'>Email es requerido</p>
                            )
                        }
                </div>
                <div class="mv3">
                  <label class="db fw6 lh-copy f6" for="password">Contraseña</label>
                  <input 
                            type="password" {...register("password", {required: true})}
                            className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' 
                            placeholder='Contraseña'
                        />
                        {
                            errors.password && (
                                <p className='text-red-500'>Contraseña requerida</p>
                            )
                        }
                </div>
              </fieldset>
              <div class="">
                <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Login"/>
              </div>
              <div class="lh-copy mt3">
                <a href="/register" class="f6 link dim black db">Registrarme</a>
              </div>
            </form>
      </main>
    )
  }
  
  export default LoginPage