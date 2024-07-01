import Image from "next/image";
import ChessBoard from "../components/ChessBoard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-2 py-10 lg:p-24">
      <ChessBoard/>
    </main>
  );
}
