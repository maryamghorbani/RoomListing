import { RoomList, HotelHeader } from '@/components';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <HotelHeader />

      <main className="flex justify-center px-3 sm:px-4 py-4 sm:py-8">
        <div className="w-full max-w-3xl">
          <RoomList />
        </div>
      </main>
    </div>
  );
}

export default App;
