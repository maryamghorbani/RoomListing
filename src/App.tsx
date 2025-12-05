import { mockRooms } from "./data/sample";
function App() {
    return (
        <div>
            <h1>Room Listing</h1>
            <pre>{JSON.stringify(mockRooms, null, 2)}</pre>
        </div>
    );
}

export default App;
