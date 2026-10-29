import fallbackCareers from "../../public/fakedata/careers.json";
import {
	isSupabaseConfigured,
	normalizeJobs,
	supabaseFetch,
} from "./itanzSupabase";

const getPublishedCareers = async () => {
	if (!isSupabaseConfigured()) {
		return fallbackCareers;
	}

	try {
		const jobs = await supabaseFetch(
			"rest/v1/itanz_jobs?select=*&is_active=eq.true&order=sort_order.asc,created_at.desc"
		);

		return jobs?.length ? normalizeJobs(jobs) : fallbackCareers;
	} catch (error) {
		console.error("Unable to load Supabase jobs:", error.message);
		return fallbackCareers;
	}
};

export default getPublishedCareers;

