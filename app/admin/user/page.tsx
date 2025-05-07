import Link from "next/link";
import { getAllUsers } from "@/app/actions/user";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
        <div className="max-w-6xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">All Users</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {users.map((user) => (
                    <Card key={user.id}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar>
                                <AvatarFallback>
                                    {user.firstName[0]}
                                    {user.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold text-lg">
                                    {user.firstName} {user.lastName}
                                </div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex justify-end">
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/admin/user/${user.id}`}>
                                    View &rarr;
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}