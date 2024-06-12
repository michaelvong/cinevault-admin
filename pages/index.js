import Layout from "@/components/layout"
import { useSession} from "next-auth/react"

export default function Home() {
  const {data: session} = useSession();
  console.log({session})
  return (
    <Layout>
      <div className="text-blue-900 flex">
        Hello, {session?.user?.name}
      </div>
    </Layout>
  )
}
