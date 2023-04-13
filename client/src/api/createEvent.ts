import { API_URL } from "./config";

export async function createEvent(title: string, startDate: Date, endDate: Date, location: string) {
    // Note: Important to use http instead of https
    const response = await fetch(`${API_URL}/decks`, {
        method: 'POST',
        body: JSON.stringify({
            title,
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