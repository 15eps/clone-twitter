import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import { useFormik } from "formik";
import api from '../services/api'
import * as yup from 'yup'

import { useAuthContext } from '../Context/authcontext'
import { Input } from "../components/Input";

const resizeFile = (file) => {
    const newImage = new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            150,
            150,
            "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64",
            150,
            150
        );
    })
    return newImage
};

const validationSchema = yup.object({
    name: yup.string().required('Nome de usuário obrigatório'),
    username: yup.string().required('Nome de usuário é obrigatório').matches(/[A-Za-z0-9\-\_\.]+/, "NOME DE USUÁRIO INVALIDO")
})

export function Profile() {
    const {user,updateData} = useAuthContext()

    const formik = useFormik({
        onSubmit:  async (values) => {                
              const res =  await api.patch('/profile', {            
                         name: values.name,
                         username: values.username.toLowerCase(),
                         avatar: values.avatar
                     
                 })  

           updateData(res.data)
        },
        initialValues: {
            username: user.username,
            name: user.name,
            avatar: user.avatar
        },
        validationSchema,
        validateOnMount: true
    })

    const handleImage = async (event) => {
        const image = await resizeFile(event.currentTarget.files[0])
        return formik.setFieldValue('avatar', image)
    }
    return (
        <div className="h-full flex flex-col">
            <div className="space-y-1 p-4 border-b border-silver">
                <h2 className="font-bold">Configurações</h2>
            </div>

            <form className="space-y-3 p-4" onSubmit={formik.handleSubmit}>
                <div className="flex items-center space-y-3 space-x-6">
                    {formik.values.avatar ?
                        (<img className="w-16 h-16 rounded-full" src={formik.values.avatar} />)
                        : <img className="w-16 rounded-full" src="/src/avatar.png" />
                    }
                    <label className="cursor-pointer" htmlFor="avatar">
                        <span className="rounded-full py-1 text-sm font-semibold text-birdBlue px-2 bg-white">Trocar foto</span>
                        <input
                            className="d-none"
                            id="avatar"
                            type="file"
                            accept='image/*'
                            onChange={(e) => handleImage(e)}
                        />
                    </label>
                </div>

                <div className="flex flex-col space-x-3">
                    <span className="text-sm">Nome</span>
                    <Input
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="flex flex-col space-x-3">
                    <span className="text-sm">Nome de usuário</span>
                    <Input
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="flex">
                    <button
                        className="flex-1 rounded-full p-4 bg-birdBlue disabled:opacity-60"
                        type="submit"
                        disabled={!formik.isValid || formik.isSubmitting}
                    >{formik.isSubmitting ? 'Salvando' : 'Salvar'}</button>
                </div>
            </form>
        </div>
    )
}