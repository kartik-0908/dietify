import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton({ route }: { route: string }) {
    return (
        <Link href={route} className="flex items-center gap-4">
            <button className="mr-4 p-2 rounded-lg">
                <ChevronLeft />
            </button>
        </Link>

    )
}