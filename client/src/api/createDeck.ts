import { API_URL } from './config';

export async function createDeck(title: string) {
    // Note: Important to use http instead of https
    const response = await fetch(`${API_URL}/decks`, {
        method: 'POST',
        body: JSON.stringify({
            title,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}