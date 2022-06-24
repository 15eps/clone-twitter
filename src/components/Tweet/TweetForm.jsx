import { useFormik } from 'formik'
import { useAuthContext } from '../../Context/authcontext';
import api from '../../services/api'

const MAX_TWEET_CHAR = 250;

export function TweetForm({ onSuccess }) {
  const {user:{avatar}} = useAuthContext()
  const formik = useFormik({
    onSubmit: async (values, form) => {
     await api.post('/tweets',{
        
          text: values.text
        
      })

      form.setFieldValue('text', '')
      onSuccess()
    },
    initialValues: {
      text: ''
    }
  })

  return (
    <div className="border-b border-silver space-y-6 p-4">

      <div className='flex space-x-5'>
        <img className='w-[35px!important] h-[35px] object-cover rounded-full' src={avatar} />
        <h1 className="font-bold text-xl">Página Inicial</h1>
      </div>

      <form className='pl-12 text-lg flex flex-col' onSubmit={formik.handleSubmit}>
        <textarea
          name="text"
          maxLength="300"
          placeholder="O que está acontecendo?"
          className="form-tweet bg-transparent outline-none h-[70px] border-none"
          value={formik.values.text}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <div className='flex justify-end items-center space-x-3'>
          <span className="text-sm">
            {
              formik.values.text.length > MAX_TWEET_CHAR
                ? <span class="text-red-500">{formik.values.text.length}</span>
                : <span>{formik.values.text.length}</span>
            } / <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
          </span>

          <button
            type="submit"
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={formik.values.text.length > MAX_TWEET_CHAR || formik.values.text.length < 1 || formik.isSubmitting}
          >{!formik.isSubmitting ? 'Enviar' : 'Enviando'}</button>
        </div>
      </form>
    </div>
  )

}

export function ReplyForm({postId,onSuccess}){
  const {user:{avatar}} = useAuthContext()
  const formik = useFormik({
    onSubmit: async (values,form) =>{
      await api.post(`/tweet/${postId}/reply`,{      
          text: values.text        
      })

      form.setFieldValue('text', '')     
      onSuccess()
    },
    initialValues:{
      text: ''
    }
  })

  return(
    <div className="flex flex-1 space-x-3 items-center p-2">
      <div>
        <img className="w-[35px!important] h-[35px] object-cover rounded-full" src={avatar} />
      </div>
      <form className="flex space-x-3 items-center flex-1" onSubmit={formik.handleSubmit}>
        <input
        name="text"
          placeholder="Comente sobre isso..."
          className="flex-1 form-tweet bg-transparent outline-none border-none"
          value={formik.values.text}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
         />
        
        <div className="flex justify-end items-center">          
        <button
         type="submit"
          className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
           disabled={formik.isSubmiting}>Enviar</button>
        </div>
      </form>
      </div>
  )
}