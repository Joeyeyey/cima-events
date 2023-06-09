import { useEffect, useState } from "react";
import "./App.css";
import { createDeck } from "./api/createDeck";
import { CreateEvent } from "./components/CreateEvent";
import EventCard from "./components/EventCard";
import { API_URL } from "./api/config";
import { CookieDocument } from "../../server/src/models/Cookie";
import { Box, Divider, Grid, Grow, Modal } from "@mui/material";
import { EditEvent } from "./components/EditEvent";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import ICimaEvent, { ICimaEventCreation } from "./interfaces/ICimaEvent";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#242424",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function App() {
    // Deck
    const [cookieCount, setCookieCount] = useState<number>(0);
    const [cookie, setCookie] = useState<CookieDocument>();
    const [title, setTitle] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Event
    const [events, setEvents] = useState<ICimaEvent[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            const response = await fetch(`${API_URL}/events`);
            const data = await response.json();
            setEvents(data);

            // console.log(data);

            const cookieResponse = await fetch(`${API_URL}/cookie`);
            const fetchedCookies: CookieDocument[] =
                await cookieResponse.json();
            setCookie(fetchedCookies[0]);
            setCookieCount(fetchedCookies[0].count);
        }

        fetchEvents();
    }, []);

    async function handleCreateDeck(e: React.FormEvent) {
        // Default behavior after saving is to refresh page
        // Lets turn that off...
        e.preventDefault();
        const deck = await createDeck(title);
        setTitle("");
    }

    function renderAllCards() {
        const sortedEvents = [...events].sort((a, b) => {
            if (a.startDate && b.startDate) {
                const a_date: Date = new Date(a.startDate);
                const b_date: Date = new Date(b.startDate);
                return a_date.getTime() - b_date.getTime();
            }
            return -Infinity;
        });

        return (
            <Grid container spacing={2} columns={3}>
                {sortedEvents.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event._id.toString()}>
                        <EventCard
                            event={event}
                            handleDeleteCard={(event) => {
                                handleDeleteCard(event);
                            }}
                            handleEditCard={(event) => {
                                setIsModalOpen(true);
                            }}
                        />
                        <Modal
                            open={isModalOpen}
                            onClose={() => {
                                setIsModalOpen(false);
                            }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}></Box>
                        </Modal>
                    </Grid>
                ))}
            </Grid>
        );
    }

    const renderCookieClicker = () => {
        return (
            <div className="cookie-clicker">
                <button
                    onClick={() => {
                        handleUpdateCookie();
                    }}
                >
                    🍪 Cookie clicker! {cookieCount}
                </button>
            </div>
        );
    };

    const renderHomeImage = () => {
        return (
            <div className="home-image">
                <a href="https://www.google.com" target="_blank">
                    <img
                        src={
                            "https://www.rd.com/wp-content/uploads/2018/02/30_Adorable-Puppy-Pictures-that-Will-Make-You-Melt_124167640_YamabikaY.jpg?fit=700,467"
                        }
                    />
                </a>
            </div>
        );
    };

    const renderBottomRightCreateButton = () => {
        // Hide buttons in prod
        const isEditable: boolean = `${API_URL}`.includes("localhost");
        if (!isEditable) {
            return <></>;
        } else {
            return <CreateEvent />;
        }
    };
    
    /* TODO: Make this append the newly created event by id */
    const handleCreateEvent = (event: ICimaEvent) => {
        setEvents((prevEvents) => [...prevEvents, event]);
    };

    const handleEditEvent = (event: ICimaEvent) => {
        const updatedEvents: ICimaEvent[] = [...events];
        updatedEvents[updatedEvents.findIndex((el) => el._id === event._id)] =
            event;
        setEvents(updatedEvents);
    };

    const handleUpdateCookie = async () => {
        if (!cookie) {
            console.error("No cookie to update!");
            return;
        }

        const newCookie: CookieDocument = cookie;
        newCookie.count += 1;
        setCookie(newCookie);
        setCookieCount(newCookie.count);
        const { count } = newCookie;

        try {
            const response = await fetch(`${API_URL}/cookie/${cookie._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ count }),
            });
            if (response.ok) {
                const responseCookie = await response.json();
            } else {
                console.error(
                    "Failed to edit cookie:",
                    response.status,
                    response.statusText
                );
            }
        } catch (error) {
            console.error("Failed to edit cookie:", error);
        }
    };

    const handleDeleteCard = (event: ICimaEvent) => {
        fetch(`${API_URL}/events/${event._id}`, {
            method: "DELETE",
        }).catch((error) => console.error(error));

        setEvents(events.filter((ev) => ev._id !== event._id));
    };

    const handleEditCard = async (event: ICimaEvent) => {
        // const confirmed = window.confirm('Coming soon!');
        // fetch(`${API_URL}/events/${event._id}`, {
        //   method: 'PUT',
        // })
        //   .catch((error) => console.error(error));

        const { title, startDate, endDate, location } = event;

        try {
            const response = await fetch(`${API_URL}/events/${event._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, startDate, endDate, location }),
            });
            if (response.ok) {
                const event = await response.json();
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

        // setEvents((prevEvents) => [...prevEvents, event]);
        //  TODO: Update events with edited event
    };

    return (
        <div className="App">
            {ResponsiveAppBar()}
            {renderHomeImage()}
            {renderCookieClicker()}
            {renderBottomRightCreateButton()}
            <>
                <h2>Upcoming events!</h2>
            </>
            <Divider />
            <Box sx={{ display: "flex" }}>
                <Grow
                    in={true}
                    style={{ transformOrigin: "0 0 0" }}
                    {...{ timeout: 1000 }}
                >
                    {renderAllCards()}
                </Grow>
            </Box>
        </div>
    );
}

export default App;
