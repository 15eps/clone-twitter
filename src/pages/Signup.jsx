import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import { Input } from '../components/Input'

const validationSchema = yup.object({
    email: yup.string().required('Email obrigatório').email('Email inválido'),
    username: yup.string().required('Nome de usuário obrigátorio'),
    name: yup.string().required('Nome obrigatório'),
    password: yup.string().required('Senha Obrigátoria')

})

export function SignUp({ signInUser }) {

    const formik = useFormik({
        onSubmit: async values => {
            const res = await axios.post('http://localhost:9901/signup', {
                email: values.email,
                username: values.username,
                name: values.name,
                password: values.password
            })
            signInUser(res.data)
        },
        initialValues: {
            email: '',
            username: '',
            name: '',
            password: ''
        },
        validationSchema,
        validateOnMount: true,
    })

    return (
        <div className="h-full flex justify-center">

            <div className="bg-birdBlue lg:flex-1">

            </div>

           <div className="flex-1 flex justify-center items-center p-12 space-y-6">
           <div className="max-w-md flex-1">
                <h1 className="text-3xl text-center">Crie sua conta</h1>

                <form className="space-y-3" onSubmit={formik.handleSubmit}>

                    <div className="space-y-2">
                        <Input
                            type="email"
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
                            type="text"
                            name="name"
                            placeholder="Digite seu nome"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {(formik.touched.name && formik.errors.name) && (
                            <span className='text-red-500 text-sm '>{formik.errors.name}</span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Input
                            type="text"
                            name="username"
                            placeholder="Digite seu nome de usuário"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {(formik.touched.username && formik.errors.username) && (
                            <span className='text-red-500 text-sm '>{formik.errors.username}</span>
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
                    >{formik.isSubmitting ? 'Criando...' : 'Criar'}</button>

                </form>
                <span className="text-sm text-silver text-center">
                    Já tem conta? <a className="text-birdBlue" href="/login">Logue-se</a>
                </span>
            </div>
           </div>
        </div>

    )
}
