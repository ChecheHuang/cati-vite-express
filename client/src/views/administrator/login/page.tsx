import girl from './assets/girl.png'
import phone from './assets/phone.png'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import trpc from '@/lib/trpc'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as z from 'zod'

const FormSchema = z.object({
  name: z.string({ required_error: '請輸入使用者名稱' }),
  password: z.string().min(1, '請輸入密碼'),
})
function Login() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: 'sunnygo',
      password: 'sunnygo',
    },
  })
  const navigate = useNavigate()
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // const admin = await trpc.adminRouter.login.query(data)
    const admin = await trpc.adminRouter.login.mutate(data)

    if (!admin) return toast.error('登入失敗')
    toast.success('登入成功')
    navigate('/administrator/cati')
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-white">
      <h1 className="mb-10 text-2xl">鍾珮玲服務處</h1>
      <div className="relative flex h-[400px] w-[350px] flex-col items-center rounded-3xl bg-primary ">
        <img
          className="absolute -left-24 bottom-0  z-10 w-[131px]"
          src={girl}
        />
        <img
          className="absolute -right-24 bottom-0  z-10 w-[131px]"
          src={phone}
        />
        <h1 className="p-8 text-2xl text-white">管理者登入</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-[285px] w-[300px] flex-col justify-around rounded-3xl bg-[#e1b8bf] p-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" font-bold">使用者</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="name"
                      placeholder="輸入使用者"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" font-bold">密碼</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-password"
                      type="password"
                      placeholder="輸入密碼"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="secondary" className="w-full " type="submit">
              登入
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Login
