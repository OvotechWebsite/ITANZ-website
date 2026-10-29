const JsonLd = ({ data }) => {
	const entries = (Array.isArray(data) ? data : [data]).filter(Boolean);
	if (!entries.length) return null;
	const json = JSON.stringify(entries.length === 1 ? entries[0] : entries).replace(
		/</g,
		"\\u003c"
	);

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: json }}
		/>
	);
};

export default JsonLd;
