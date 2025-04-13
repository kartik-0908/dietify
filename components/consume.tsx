import { updatemealconsumption } from "@/app/actions/meal";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function Consume({ id, isConsumed }: { id: string, isConsumed: boolean }) {
    const [consumed, setConsumed] = useState(isConsumed);
    const handleConsume = async () => {
        setConsumed(!consumed);
        await updatemealconsumption(id, !consumed);
    }
    return (
        <div className="h-8 w-8 rounded-lg flex items-center justify-center">
            {consumed ? <MinusCircle onClick={handleConsume} className='text-red-300' size={20} /> : <PlusCircle onClick={handleConsume} className='text-[#008000]' size={20} />}
        </div>
    )
}