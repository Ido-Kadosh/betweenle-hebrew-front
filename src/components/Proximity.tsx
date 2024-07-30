interface PropTypes {
	proximity: { top: number | null; bottom: number | null };
}
const Proximity = ({ proximity }: PropTypes) => {
	const getCirclePos = () => {
		if (!proximity.top || !proximity.bottom) return;
		const total = proximity.top + proximity.bottom;

		const topPosition = Math.floor((proximity.top / total) * 100); // closer to top
		const bottomPosition = Math.floor((proximity.bottom / total) * 100); // Closer to bottom
		const position = proximity.top <= proximity.bottom ? topPosition : bottomPosition;
		return Math.max(15, Math.min(position, 85)); // don't be lower than 15 or higher than 85
	};

	return (
		<div className="text-clamp-xl flex flex-col my-[0.5em]">
			<div className="bg-blue-100 w-[2em] relative text-center aspect-[1.3] rounded-md text-white ">
				<div className="w-[1em] top-0 aspect-square absolute bg-blue-100 transform rotate-45 origin-top-left translate-y-[0.5em] "></div>
				<span className="relative z-10">{proximity.top ?? '?'}</span>
			</div>
			<div className="bg-blue-100 z-100 w-[0.2em] h-full self-center relative">
				{!!proximity.top && !!proximity.bottom && (
					<div
						className={`absolute h-[0.7em] aspect-square bg-orange rounded-full -left-[0.25em] transform`}
						style={{ top: `calc(${getCirclePos()}% - 0.35em)` }}
					></div>
				)}
			</div>
			<div className="bg-blue-100 w-[2em] relative text-center aspect-[1.3] rounded-md text-white ">
				<span className="relative z-10">{proximity.bottom ?? '?'}</span>
				<div className="w-[1em] top-0 aspect-square absolute bg-blue-100 transform rotate-45 origin-top-left -translate-y-[0.4em] "></div>
			</div>
		</div>
	);
};

export default Proximity;
