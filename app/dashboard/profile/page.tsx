import { getUserDetails } from "@/app/actions/user";
import Profile from "./comp";

export default async function Page(){
    const user = await getUserDetails();
    return <Profile userData={user} />
}