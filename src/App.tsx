import MsgProvider from './contexts/MsgContext/MsgProvider';
import GamePage from './pages/GamePage';

function App() {
	return (
		<MsgProvider>
			<main className="max-w-4xl m-auto h-screen">
				<GamePage />
			</main>
		</MsgProvider>
	);
}

export default App;
