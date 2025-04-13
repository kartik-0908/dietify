'use client'
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({route}: {route: string}) {
    const router = useRouter()
    return (
        <button onClick={() => router.push(route)} className="mr-4 p-2 rounded-lg">
            <ChevronLeft />
        </button>
    )
}