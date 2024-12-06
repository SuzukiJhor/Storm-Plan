import {createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect, RedirectType } from 'next/navigation'
import { cookies } from 'next/headers'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default async function Home() {
  let loggedIn = false
  try {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    if (session) loggedIn = true
  } catch (err) {
    console.log('Home:Login', err)
  }
  if (loggedIn) redirect('/user-app', RedirectType.replace)

    return (
      <div className="flex flex-col h-screen w-full justify-center items-center">
        <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="password">Criar Conta</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Bem Vindo, Entre na sua Conta por aqui
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Sobrenome</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Criar Conta</CardTitle>
              <CardDescription>
                Bem Vindo, Crie sua conta aqui
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Login</Label>
                <Input id="current"/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Senha</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Criar Conta</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    )
}
