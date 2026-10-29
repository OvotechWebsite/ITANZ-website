import FunfactSingle from "@/components/shared/funfact/FunfactSingle";
import { stats } from "./data";

const ItanzStats = () => {
	return (
		<div className="tj-countup-section itanz-template-countup">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="countup-wrap">
							{stats.map(({ value, symbol, text }, idx) => (
								<div key={text} className="countup-item">
									<FunfactSingle
										currentValue={value}
										symbol={symbol}
										minDigits={value < 10 ? 2 : undefined}
									/>
									<span className="count-text">{text}</span>
									{idx < stats.length - 1 ? (
										<span
											className="count-separator"
											style={{
												backgroundImage: "url('/images/shape/separator.svg')",
											}}
										></span>
									) : (
										""
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ItanzStats;
