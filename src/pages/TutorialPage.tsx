import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Separator from '../components/Separator';

const TutorialPage = () => {
	return (
		<section className="text-2xl">
			<div className="mb-6 relative">
				<h1 className="text-4xl font-bold text-center ">איך משחקים</h1>
				<Link to="/daily" className="absolute left-2 top-2">
					<div className="border-2 rounded-full border-black">
						<IoClose />
					</div>
				</Link>
			</div>
			<p>
				נחשו את המילה הסודית המוסתרת בין מילים אחרות. המילון ממויין לפי <span className="font-bold">סדר אלפביתי</span>.
				הכנסת מילה תודיע לך אם המילה הסודית ממוקמת במילון <span className="font-bold">לפני</span> או
				<span className="font-bold"> אחרי </span> המילה שהוזנה. <span className="font-bold">הנקודה הכתומה</span> תודיע
				לך אם המילה הסודית קרובה יותר למילה העליונה או התחתונה.
			</p>
			<Separator />
		</section>
	);
};

export default TutorialPage;
