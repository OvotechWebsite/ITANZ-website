"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState } from "react";

const areaOptions = [
	"Oracle",
	"NetSuite",
	"Salesforce",
	"Data & AI",
	"Integration & Automation",
	"Cloud / Infrastructure",
	"Cybersecurity",
	"Managed Services",
	"Software Engineering",
	"Project / Delivery Management",
	"Business / Functional Consulting",
	"Sales & Growth",
	"Marketing",
	"Finance / Operations",
	"Other",
];

const experienceOptions = [
	"Graduate / Entry Level",
	"1-3 Years",
	"4-7 Years",
	"8-12 Years",
	"12+ Years",
];

const opportunityOptions = [
	"Full-Time",
	"Contract",
	"Consulting",
	"Graduate / Internship",
	"Open to Opportunities",
];

const locationOptions = [
	"Pakistan",
	"Australia / New Zealand",
	"Middle East",
	"UK / Europe",
	"Remote",
	"Open to Relocation",
];

const emptyStepOneFields = {
	full_name: "",
	email: "",
	phone: "",
	current_city: "",
	current_country: "",
	linkedin: "",
};

const emptyStepTwoFields = {
	area_interest: [],
	experience_level: "",
	opportunity_type: "",
	work_location: "",
	portfolio: "",
	impact: "",
	consent: false,
};

const Field = ({ children, label, note }) => (
	<label className="itanz-talent-field">
		<span>{label}</span>
		{note ? <small>{note}</small> : ""}
		{children}
	</label>
);

const RadioGroup = ({ legend, name, options, value, onChange }) => (
	<fieldset className="itanz-talent-choice-group">
		<legend>{legend}</legend>
		<div>
			{options.map(option => (
				<label key={option}>
					<input
						type="radio"
						name={name}
						value={option}
						checked={value === option}
						onChange={onChange}
						required
					/>
					<span>{option}</span>
				</label>
			))}
		</div>
	</fieldset>
);

const ItanzTalentNetworkModal = ({
	buttonText = "Submit Your Profile",
	className = "",
	isTextBtn = false,
	roleTitle = "",
}) => {
	const formId = useId();
	const formRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [step, setStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [stepOneFields, setStepOneFields] = useState(emptyStepOneFields);
	const [stepTwoFields, setStepTwoFields] = useState(emptyStepTwoFields);
	const [status, setStatus] = useState({ type: "", message: "" });
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		document.body.classList.toggle("itanz-modal-open", isOpen);
		return () => document.body.classList.remove("itanz-modal-open");
	}, [isOpen]);

	const closeModal = () => {
		setIsOpen(false);
	};

	const openModal = () => {
		setIsOpen(true);
		setStep(1);
		setSubmitted(false);
		setStatus({ type: "", message: "" });
	};

	const updateStepOneField = event => {
		const { name, value } = event.target;

		setStepOneFields(prevFields => ({
			...prevFields,
			[name]: value,
		}));
	};

	const updateStepTwoField = event => {
		const { checked, name, type, value } = event.target;

		setStepTwoFields(prevFields => {
			if (name === "area_interest") {
				const nextAreas = checked
					? [...prevFields.area_interest, value]
					: prevFields.area_interest.filter(area => area !== value);

				return {
					...prevFields,
					area_interest: nextAreas,
				};
			}

			return {
				...prevFields,
				[name]: type === "checkbox" ? checked : value,
			};
		});
	};

	const handleStepOne = () => {
		const requiredFields = [
			"full_name",
			"email",
			"phone",
			"current_city",
			"current_country",
		];
		const missing = requiredFields.some(name => !stepOneFields[name]?.trim());

		if (missing) {
			setStatus({
				type: "error",
				message: "Please complete all required Step 1 fields.",
			});
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stepOneFields.email)) {
			setStatus({
				type: "error",
				message: "Please enter a valid email address.",
			});
			return;
		}

		setStatus({ type: "", message: "" });
		setStep(2);
	};

	const handleSubmit = async event => {
		event.preventDefault();
		setStatus({ type: "", message: "" });
		setIsSubmitting(true);

		try {
			const form = event.currentTarget;
			const formData = new FormData(form);

			Object.entries(stepOneFields).forEach(([name, value]) => {
				formData.set(name, value);
			});
			formData.set(
				"source_page",
				`${window.location.pathname}${window.location.search}`
			);
			Object.entries(stepTwoFields).forEach(([name, value]) => {
				if (Array.isArray(value)) {
					formData.delete(name);
					value.forEach(item => formData.append(name, item));
					return;
				}

				formData.set(name, value);
			});

			const response = await fetch("/api/talent-network", {
				method: "POST",
				body: formData,
			});
			const result = await response.json();

			if (!response.ok) {
				throw new Error(result?.error || "Unable to submit your profile.");
			}

			form.reset();
			setStepOneFields(emptyStepOneFields);
			setStepTwoFields(emptyStepTwoFields);
			setSubmitted(true);
		} catch (error) {
			setStatus({
				type: "error",
				message:
					error?.message ||
					"Unable to submit your profile right now. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const modalContent = isOpen ? (
		<div
					className="itanz-talent-modal"
					role="dialog"
					aria-modal="true"
					aria-labelledby={`${formId}-title`}
				>
					<button
						type="button"
						className="itanz-talent-backdrop"
						aria-label="Close talent network form"
						onClick={closeModal}
					></button>
					<div className="itanz-talent-panel">
						<button
							type="button"
							className="itanz-talent-close"
							aria-label="Close"
							onClick={closeModal}
						>
							<i className="fa-regular fa-xmark"></i>
						</button>

						<div className="itanz-talent-panel-content">
							{submitted ? (
								<div className="itanz-talent-success">
								<span className="sub-title">
									<i className="tji-box"></i>Talent Network
								</span>
								<h2>You&apos;re now part of the iTANZ Talent Network.</h2>
								<p>
									Thanks for introducing yourself. Our team will review your
									profile and may reach out when an opportunity aligns with your
									experience and interests.
								</p>
								<div className="itanz-talent-actions">
									<Link className="tj-primary-btn" href="#open-roles" onClick={closeModal}>
										<span className="btn-text">
											<span>View Open Roles</span>
										</span>
										<span className="btn-icon">
											<i className="tji-arrow-right-long"></i>
										</span>
									</Link>
									<Link
										className="text-btn"
										href="https://www.linkedin.com/company/itanz/"
										target="_blank"
									>
										<span className="btn-text">
											<span>Follow iTANZ on LinkedIn</span>
										</span>
										<span className="btn-icon">
											<i className="tji-arrow-right-long"></i>
										</span>
									</Link>
								</div>
								</div>
							) : (
								<>
								<div className="itanz-talent-head">
									<span className="sub-title">
										<i className="tji-box"></i>Careers
									</span>
									<h2 id={`${formId}-title`}>Join the iTANZ Talent Network</h2>
									<p>
										Don&apos;t see the right opportunity today? Tell us where you
										can make an impact, and we&apos;ll keep you in mind for
										relevant future roles.
									</p>
									<div className="itanz-talent-progress">
										<span className={step === 1 ? "active" : ""}>Step 1</span>
										<span className={step === 2 ? "active" : ""}>Step 2</span>
									</div>
								</div>

								<form ref={formRef} onSubmit={handleSubmit}>
									<input type="hidden" name="role_interest" value={roleTitle} />
									<input
										type="text"
										name="website"
										tabIndex="-1"
										autoComplete="off"
										className="itanz-honeypot"
									/>
									<div
										className="itanz-talent-step"
										hidden={step !== 1}
									>
											<h3>Step 1 — About You</h3>
											<div className="itanz-talent-grid">
												<Field label="Full Name*">
													<input
														type="text"
														name="full_name"
														value={stepOneFields.full_name}
														onChange={updateStepOneField}
														required
													/>
												</Field>
												<Field label="Email Address*">
													<input
														type="email"
														name="email"
														value={stepOneFields.email}
														onChange={updateStepOneField}
														required
													/>
												</Field>
												<Field label="Mobile / WhatsApp*" note="Country code + number">
													<input
														type="tel"
														name="phone"
														value={stepOneFields.phone}
														onChange={updateStepOneField}
														required
													/>
												</Field>
												<Field label="LinkedIn Profile" note="Recommended">
													<input
														type="url"
														name="linkedin"
														value={stepOneFields.linkedin}
														onChange={updateStepOneField}
													/>
												</Field>
												<Field label="City*">
													<input
														type="text"
														name="current_city"
														value={stepOneFields.current_city}
														onChange={updateStepOneField}
														required
													/>
												</Field>
												<Field label="Country*">
													<input
														type="text"
														name="current_country"
														value={stepOneFields.current_country}
														onChange={updateStepOneField}
														required
													/>
												</Field>
											</div>
											<div className="itanz-talent-footer">
												<button
													type="button"
													className="tj-primary-btn"
													onClick={handleStepOne}
												>
													<span className="btn-text">
														<span>Continue</span>
													</span>
													<span className="btn-icon">
														<i className="tji-arrow-right-long"></i>
													</span>
												</button>
											</div>
										</div>
									<div
										className="itanz-talent-step"
										hidden={step !== 2}
									>
											<h3>Step 2 — Where You Fit</h3>
											<p>
												Help iTANZ understand the roles, regions and work where
												you can contribute.
											</p>
											<fieldset className="itanz-talent-choice-group">
												<legend>Area of Interest*</legend>
												<div className="itanz-talent-multi">
													{areaOptions.map(option => (
														<label key={option}>
															<input
																type="checkbox"
																name="area_interest"
																value={option}
																checked={stepTwoFields.area_interest.includes(option)}
																onChange={updateStepTwoField}
															/>
															<span>{option}</span>
														</label>
													))}
												</div>
											</fieldset>
											<RadioGroup
												legend="Experience Level*"
												name="experience_level"
												options={experienceOptions}
												value={stepTwoFields.experience_level}
												onChange={updateStepTwoField}
											/>
											<RadioGroup
												legend="What kind of opportunity are you interested in?*"
												name="opportunity_type"
												options={opportunityOptions}
												value={stepTwoFields.opportunity_type}
												onChange={updateStepTwoField}
											/>
											<RadioGroup
												legend="Preferred Work Location*"
												name="work_location"
												options={locationOptions}
												value={stepTwoFields.work_location}
												onChange={updateStepTwoField}
											/>
											<div className="itanz-talent-grid mb-4">
												<Field label="Upload Your CV*" note="PDF / DOC / DOCX — max 5 MB">
													<input
														type="file"
														name="cv"
														accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
														required
													/>
												</Field>
												<Field
													label="Portfolio / GitHub / Personal Website"
													note="Especially valuable for design, development, engineering, AI and technical candidates."
												>
													<input
														type="url"
														name="portfolio"
														value={stepTwoFields.portfolio}
														onChange={updateStepTwoField}
													/>
												</Field>
											</div>
											<Field label="Tell us where you'd like to make an impact" note="In 2-3 lines, tell us about the type of work or challenge you're looking for.">
												<textarea
													name="impact"
													rows="4"
													value={stepTwoFields.impact}
													onChange={updateStepTwoField}
												></textarea>
											</Field>
											<label className="itanz-consent">
												<input
													type="checkbox"
													name="consent"
													value="on"
													checked={stepTwoFields.consent}
													onChange={updateStepTwoField}
													required
												/>
												<span>
													By submitting your profile, you agree that iTANZ may
													contact you about relevant career opportunities.
												</span>
											</label>
											<div className="itanz-talent-footer">
												<button
													type="button"
													className="text-btn"
													onClick={() => setStep(1)}
												>
													<span className="btn-text">
														<span>Back</span>
													</span>
												</button>
												<button
													type="submit"
													className="tj-primary-btn"
													disabled={isSubmitting}
												>
													<span className="btn-text">
														<span>
															{isSubmitting ? "Submitting..." : "Join Talent Network"}
														</span>
													</span>
													<span className="btn-icon">
														<i className="tji-arrow-right-long"></i>
													</span>
												</button>
											</div>
										</div>
									{status.message ? (
										<p
											className={`itanz-form-status ${status.type}`}
											role="status"
											aria-live="polite"
										>
											{status.message}
										</p>
									) : (
										""
									)}
								</form>
								</>
							)}
						</div>
					</div>
		</div>
	) : null;

	return (
		<>
			<button
				type="button"
				className={`${isTextBtn ? "text-btn" : "tj-primary-btn"} ${className}`}
				onClick={openModal}
			>
				<span className="btn-text">
					<span>{buttonText}</span>
				</span>
				<span className="btn-icon">
					<i className="tji-arrow-right-long"></i>
				</span>
			</button>

			{isMounted && modalContent ? createPortal(modalContent, document.body) : ""}
		</>
	);
};

export default ItanzTalentNetworkModal;
