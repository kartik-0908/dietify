import { getUserDetails } from "@/app/actions/user";
import Profile from "./comp";

export default async function Page(){
    const user = await getUserDetails();
    if(!user) return <div>User not found</div>
    return <Profile userData={user} />
}