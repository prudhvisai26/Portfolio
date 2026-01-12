import { themes } from "@/src/data/themes";

function Home(){
  return (
    <main className="min-h-screen bg-linear-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center flex-col">
        <h1 className="text-4xl text-yellow-500 font-bold mb-8">Choose Your Realm</h1>
        <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-8 min-w-[600px] min-h-[200px]"> 
         <p className="text-white">Cards coming soon!</p>
        </div>
    </main>
  );
}

export default Home;