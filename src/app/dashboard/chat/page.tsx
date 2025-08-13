import Image from "next/image";
import WorkingChatbot from "@/components/ai-ui/working-chatbot";
import ChatbotUi from "@/components/ai-ui/chatbot-ui";
import Navbar from "@/components/ui/navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth/login");
  }
  return (
    <>
      {/* <Navbar /> */}
      {/* <WorkingChatbot /> */}
      <div>
        <ChatbotUi />
      </div>
    </>
  );
}
