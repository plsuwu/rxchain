import { fail, type Actions } from "@sveltejs/kit";

export const actions = {
	search: async ({ request, fetch }) => {
		const fd = await request.formData();
		const q = fd.get("search-query");
		if (q == null || q === "") {
			console.warn("empty or missing search query:", q);
			return fail(400, { error: "empty or missing search query" });
		}

		try {
			const res = await fetch(`/api/medications/search?q=${q}`, {
				method: "GET",
			});

			const body = await res.json();
			console.log(body.data);

			return body.data;
		} catch (err) {
			console.error("failed while trying to run search:", err);
			return fail(500, { error: "internal error" });
		}
	},

	prescribe: async ({ request, fetch }) => {},
} satisfies Actions;
