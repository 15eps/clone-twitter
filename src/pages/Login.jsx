import { useFormik } from 'formik'
import * as yup from 'yup'

import { useAuthContext } from '../Context/authcontext'

import { Input } from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'

const validationSchema = yup.object({
    email: yup.string().required('Email/Nome de usuáriuo obrigatório'),
    password: yup.string().required('Senha Obrigátoria')
})

export function Login() {
    const { handlelogin } = useAuthContext()

    const formik = useFormik({
        onSubmit: async values => {
            await handlelogin(values.email, values.password)            
        },
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        validateOnMount: true,
    })

    return (
        <div className="h-full flex flex-col justify-center p-12 space-y-6">
            <h1 className="text-3xl">Acesse sua conta</h1>

            <form className="space-y-3" onSubmit={formik.handleSubmit}>
                
                <div className="space-y-2">
                    <Input
                        type="text"
                        name="email"
                        placeholder="Digite seu email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {(formik.touched.email && formik.errors.email) && (
                        <span className='text-red-500 text-sm '>{formik.errors.email}</span>
                    )}
                </div>

                <div className="space-y-2">
                    <Input
                        type="password"
                        name="password"
                        placeholder="Digite sua senha"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {(formik.touched.password && formik.errors.password) && (
                        <span className='text-red-500 text-sm'>{formik.errors.password}</span>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full rounded-full bg-birdBlue py-4 roundend-full disabled:opacity-50 text-lg"
                    disabled={formik.isSubmitting || !formik.isValid}
                >{formik.isSubmitting ? 'Logando' : 'Entrar'}</button>

            </form>
            <span className="text-sm text-silver">
                Não tem conta? <Link className="text-birdBlue" to="/signup">Increva-se</Link>
            </span>
        </div>
    )
}