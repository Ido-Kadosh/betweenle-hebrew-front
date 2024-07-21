import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import MsgProvider from './contexts/MsgContext/MsgProvider';
import GamePage from './pages/GamePage';
import TutorialPage from './pages/TutorialPage';
import HomePage from './pages/HomePage';

function App() {
	return (
		<Router>
			<MsgProvider>
				<main className="max-w-4xl m-auto h-screen px-4 pt-4">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/daily" element={<GamePage />} />
						<Route path="/tutorial" element={<TutorialPage />} />
					</Routes>
				</main>
			</MsgProvider>
		</Router>
	);
}

export default App;
