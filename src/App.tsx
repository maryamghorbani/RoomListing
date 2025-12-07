import { RoomList } from "./components/RoomList/RoomList";

function App() {
    return (
        <div className="min-h-screen bg-slate-50 flex justify-center px-4 py-8">
            <div className="w-full max-w-3xl">
                <RoomList />
            </div>
        </div>
    );
}

export default App;
