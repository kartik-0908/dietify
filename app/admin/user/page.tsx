import Link from "next/link";
import { getAllUsers } from "@/app/actions/user";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    // Add other fields if needed
}

export default async function UsersPage() {
    const users: User[] = await getAllUsers();

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">All Users</h1>
            <ul className="space-y-4">
                {users.map((user) => (
                    <li key={user.id}>
                        <Link
                            href={`/admin/user/${user.id}`}
                            className="flex items-center justify-between p-5 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition"
                        >
                            <div>
                                <div className="font-semibold text-lg">{user.firstName} {user.lastName}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                            <span className="text-blue-500 font-medium text-sm">View &rarr;</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}