import { API_URL } from "./config";

export async function createEvent(title: string, description: string, startDate: Date, endDate: Date, location: string) {
    // Note: Important to use http instead of https
    const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            startDate,
            endDate,
            location,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}
