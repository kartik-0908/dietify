export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" bg-[#070417] min-h-screen flex flex-col items-center justify-start">
            <div className="w-full lg:max-w-[900px]">
                {children}
            </div>
        </div>
    );
}