"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import {
	formOptions,
	industrySelectMap,
	intentMessageMap,
	solutionSelectMap,
} from "./contactData";

const SelectInput = ({ name, options, selectedValue, onChange }) => {
	const value = options.includes(selectedValue) ? selectedValue : options[0];

	return (
		<div className="form-input">
			<select
				name={name}
				value={value}
				onChange={event => onChange?.(event.target.value)}
			>
				{options.map(option => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};

const getSelectedSolution = solution => {
	if (!solution) {
		return "";
	}

	const normalized = Array.isArray(solution) ? solution[0] : solution;
	return solutionSelectMap[normalized] || normalized;
};

const getSelectedIndustry = industry => {
	if (!industry) {
		return "";
	}

	const normalized = Array.isArray(industry) ? industry[0] : industry;
	return industrySelectMap[normalized] || normalized;
};

const ItanzContactForm = ({
	title = "Send an Enquiry",
	buttonText = "Send Enquiry",
	selectedSolution,
	selectedIntent = "",
}) => {
	const pathname = usePathname();
	const [solutionValue, setSolutionValue] = useState(
		getSelectedSolution(selectedSolution)
	);
	const [regionValue, setRegionValue] = useState("");
	const [industryValue, setIndustryValue] = useState("");
	const [customSolutionValue, setCustomSolutionValue] = useState("");
	const [intentValue, setIntentValue] = useState(selectedIntent);
	const [sourcePage, setSourcePage] = useState("");
	const [formStatus, setFormStatus] = useState({ type: "", message: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const messagePlaceholder =
		intentMessageMap[intentValue] || "Tell us what you want to discuss*";

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const querySolution = params.get("solution");
		const queryIndustry = params.get("industry");
		const queryRegion = params.get("region");
		const queryIntent = params.get("intent");
		const querySource = params.get("source");
		const nextSolution = getSelectedSolution(querySolution);
		const nextIndustry = getSelectedIndustry(queryIndustry);

		if (queryRegion && formOptions.regions.includes(queryRegion)) {
			setRegionValue(queryRegion);
		}

		if (nextSolution) {
			setSolutionValue(nextSolution);
		}

		if (nextIndustry) {
			setIndustryValue(nextIndustry);
		}

		if (queryIntent || selectedIntent) {
			setIntentValue(queryIntent || selectedIntent);
		}

		setSourcePage(querySource || document.referrer || pathname || "");
	}, [pathname, selectedIntent]);

	useEffect(() => {
		if (!sourcePage && pathname) {
			setSourcePage(pathname);
		}
	}, []);

	const handleSubmit = async event => {
		event.preventDefault();
		setFormStatus({ type: "", message: "" });
		setIsSubmitting(true);

		const form = event.currentTarget;
		const formData = new FormData(form);
		const payload = Object.fromEntries(formData.entries());
		payload.consent = formData.get("consent") === "on";

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			const result = await response.json();

			if (!response.ok) {
				throw new Error(result?.error || "Unable to send your enquiry.");
			}

			form.reset();
			setRegionValue("");
			setSolutionValue("");
			setIndustryValue("");
			setCustomSolutionValue("");
			setIntentValue(selectedIntent);
			setFormStatus({
				type: "success",
				message:
					"Thank you. Your enquiry has been submitted successfully, and a confirmation email has been sent to you.",
			});
		} catch (error) {
			setFormStatus({
				type: "error",
				message:
					error?.message ||
					"Unable to send your enquiry right now. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="contact-form itanz-contact-form wow fadeInUp">
			<h3 className="title">{title}</h3>
			<form id="itanz-contact-form" onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-input">
							<input type="text" name="name" placeholder="Full Name*" required />
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-input">
							<input type="text" name="company" placeholder="Company*" required />
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-input">
							<input
								type="email"
								name="email"
								placeholder="Email Address*"
								required
							/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-input">
							<input type="tel" name="phone" placeholder="Phone Number" />
						</div>
					</div>
					<div className="col-sm-4">
						<SelectInput
							name="region"
							options={formOptions.regions}
							selectedValue={regionValue}
							onChange={setRegionValue}
						/>
					</div>
					<div className="col-sm-4">
						<SelectInput
							name="industry"
							options={formOptions.industries}
							selectedValue={industryValue}
							onChange={setIndustryValue}
						/>
					</div>
					<div className="col-sm-4">
						<SelectInput
							name="solution"
							options={formOptions.solutions}
							selectedValue={solutionValue}
							onChange={value => {
								setSolutionValue(value);
								if (value !== "Other") {
									setCustomSolutionValue("");
								}
							}}
						/>
					</div>
					{solutionValue === "Other" ? (
						<div className="col-sm-12">
							<div className="form-input">
								<input
									type="text"
									name="custom_solution"
									placeholder="Please specify the solution*"
									value={customSolutionValue}
									onChange={event =>
										setCustomSolutionValue(event.target.value)
									}
									required
								/>
							</div>
						</div>
					) : (
						""
					)}
					<div className="col-sm-12">
						<div className="form-input message-input">
							<textarea
								name="message"
								id="message"
								placeholder={messagePlaceholder}
								required
							></textarea>
						</div>
					</div>
					<input type="hidden" name="enquiry_type" value={intentValue} />
					<input type="hidden" name="source_page" value={sourcePage} />
					<input
						type="text"
						name="website"
						tabIndex="-1"
						autoComplete="off"
						className="itanz-honeypot"
					/>
					<div className="col-sm-12">
						<label className="itanz-consent">
							<input type="checkbox" name="consent" required />
							<span>
								I agree that iTANZ may use my details to respond to this enquiry
								in line with its privacy process.
							</span>
						</label>
					</div>
					{formStatus.message ? (
						<div className="col-sm-12">
							<p
								className={`itanz-form-status ${formStatus.type}`}
								role="status"
								aria-live="polite"
							>
								{formStatus.message}
							</p>
						</div>
					) : (
						""
					)}
					<div className="submit-btn">
						<ButtonPrimary
							type="submit"
							text={isSubmitting ? "Sending..." : buttonText}
							disabled={isSubmitting}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ItanzContactForm;
