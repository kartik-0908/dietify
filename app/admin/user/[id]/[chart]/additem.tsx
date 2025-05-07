"use client";
import { addItemToDietChart } from "@/app/actions/meal";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AddItemForm({ mealType, chart, mealItems }: { mealType: "breakfast" | "lunch" | "dinner", chart: string, mealItems: any[] }) {
    const [show, setShow] = React.useState(false);
    const [selected, setSelected] = React.useState<number | null>(null);
    const [servingSize, setServingSize] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleAdd = async () => {
        if (!selected) return;
        setMessage("Adding...");
        try {
            const res = await addItemToDietChart(chart, mealType, selected, servingSize);
            if (res.success) {
                setMessage("Added!");
                setTimeout(() => window.location.reload(), 700);
            } else {
                setMessage("Failed to add.");
            }
        } catch {
            setMessage("Error.");
        }
    };

    return (
        <>
            <Button onClick={() => setShow(true)} type="button">
                Add Item
            </Button>
            <Dialog open={show} onOpenChange={setShow}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Item to {mealType}</DialogTitle>
                    </DialogHeader>
                    <Select
                        value={selected ? String(selected) : ""}
                        onValueChange={val => {
                            setSelected(Number(val));
                            const item = mealItems.find((m: any) => m.id === Number(val));
                            setServingSize(item?.servingSize || "");
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Item" />
                        </SelectTrigger>
                        <SelectContent>
                            {mealItems.map((item: any) => (
                                <SelectItem key={item.id} value={String(item.id)}>
                                    {item.name} ({item.Calories} cal)
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input
                        placeholder="Serving Size"
                        value={servingSize}
                        onChange={e => setServingSize(e.target.value)}
                        className="mt-2"
                    />
                    <div className="flex gap-2 mt-4">
                        <Button onClick={handleAdd} type="button">
                            Add
                        </Button>
                        <Button variant="secondary" onClick={() => setShow(false)} type="button">
                            Cancel
                        </Button>
                    </div>
                    {message && <div className="mt-2 text-sm">{message}</div>}
                </DialogContent>
            </Dialog>
        </>
    );
}