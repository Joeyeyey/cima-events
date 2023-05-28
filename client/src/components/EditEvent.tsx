import React, { useState } from "react";
import { API_URL } from "../api/config";
import { Alert } from "@mui/material";
import ICimaEvent from "../interfaces/ICimaEvent";

interface EditEventProps {
    onEditEvent: (event: ICimaEvent) => void;
    event?: ICimaEvent;
}

export function EditEvent(props: EditEventProps) {
    const [title, setTitle] = useState(props.event?.title ?? "");
    const [startDate, setStartDate] = useState<Date | undefined>(
        props.event?.startDate ?? undefined
    );
    const [endDate, setEndDate] = useState<Date | undefined>(
        props.event?.endDate ?? undefined
    );
    const [location, setLocation] = useState(props.event?.location ?? "");

    const handleSubmit = async (
        formEvent: React.FormEvent<HTMLFormElement>
    ) => {
        formEvent.preventDefault();

        const confirmed = window.confirm(
            `Are you sure you want to edit "${title}"?`
        );
        if (confirmed) {
            try {
                const response = await fetch(
                    `${API_URL}/events/${props.event?._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            title,
                            startDate,
                            endDate,
                            location,
                        }),
                    }
                );
                if (response.ok) {
                    const event = await response.json();
                    props.onEditEvent(event);
                } else {
                    console.error(
                        "Failed to edit event:",
                        response.status,
                        response.statusText
                    );
                }
            } catch (error) {
                console.error("Failed to edit event:", error);
            }
        }
    };

    const handleTimeChange = (
        isStartTime: boolean,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const localDateTime = event.target.value;
        const localDateTimeInMs = new Date(localDateTime).getTime();
        const timeZoneOffsetInMs = new Date().getTimezoneOffset() * 60 * 1000;
        const dateInLocalTimezone = new Date(
            localDateTimeInMs - timeZoneOffsetInMs
        );
        isStartTime
            ? setStartDate(dateInLocalTimezone)
            : setEndDate(dateInLocalTimezone);
    };

    if (!props.event) {
        return <Alert severity="error">Cannot edit an undefined event</Alert>;
    }

    return (
        <>
            <h2>Edit Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="startDate">Start date:</label>
                    <input
                        type="datetime-local"
                        id="startDate"
                        value={
                            startDate
                                ? startDate.toISOString().slice(0, -8)
                                : ""
                        }
                        onChange={(e) => {
                            handleTimeChange(true, e);
                        }}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="endDate">End date:</label>
                    <input
                        type="datetime-local"
                        id="endDate"
                        value={
                            endDate ? endDate.toISOString().slice(0, -8) : ""
                        }
                        onChange={(e) => {
                            handleTimeChange(false, e);
                        }}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        required
                    />
                </div>
                <button type="submit">Edit Event</button>
            </form>
        </>
    );
}
