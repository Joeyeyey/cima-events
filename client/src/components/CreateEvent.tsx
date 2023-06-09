import {
    SpeedDial,
    SpeedDialIcon,
    Modal,
    Box,
    Typography,
    TextField,
    InputAdornment,
    Button,
} from "@mui/material";
import {
    LocalizationProvider,
    DatePicker,
    TimePicker,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { API_URL } from "../api/config";
import { ICimaEventCreation } from "../interfaces/ICimaEvent";

import CSS from "csstype";

import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

/* Create a callback to obtain the id once added to the db so that the event 
can be retrieved and added to the main list. Backend should therefore return 
the id of the newly created event object. See handleCreateEvent() in App.tsx. */
export function CreateEvent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [location, setLocation] = useState("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "white",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const fixedBottomRightStyle: CSS.Properties = {
        position: "fixed",
        bottom: "20px",
        right: "20px",
    };

    const actions = [
        { icon: <FileCopyIcon />, name: "Copy" },
        { icon: <SaveIcon />, name: "Save" },
        { icon: <PrintIcon />, name: "Print" },
        { icon: <ShareIcon />, name: "Share" },
    ];

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    startDate,
                    endDate,
                    location,
                }),
            });
            if (response.ok) {
                const event = await response.json();
            } else {
                console.error(
                    "Failed to create event:",
                    response.status,
                    response.statusText
                );
            }
        } catch (error) {
            console.error("Failed to create event:", error);
        }

        setIsModalOpen(false);
    };

    // TODO: Time
    const areAllFieldsComplete = () => {
        return (
            title.length > 0 &&
            startDate !== null &&
            endDate !== null &&
            location.length > 0
        );
    };

    return (
        <>
            <div className="speed-dial-button">
                <SpeedDial
                    ariaLabel="SpeedDial openIcon example"
                    sx={{ position: "absolute", bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon openIcon={<EditCalendarIcon />} />}
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                    style={fixedBottomRightStyle}
                />
            </div>

            <div className="create-event-modal">
                <Modal
                    open={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                    }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Add Event
                        </Typography>
                        <div className="date-picker">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TextField
                                    onChange={(
                                        newTitle: React.ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => {
                                        setTitle(newTitle.target.value);
                                    }}
                                    id="outlined-basic"
                                    label="Title"
                                    variant="outlined"
                                />
                                <TextField
                                    onChange={(
                                        newDescription: React.ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => {
                                        setDescription(
                                            newDescription.target.value
                                        );
                                    }}
                                    id="outlined-basic"
                                    label="Description"
                                    variant="outlined"
                                />
                                <TextField
                                    onChange={(
                                        newLocation: React.ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => {
                                        setLocation(newLocation.target.value);
                                    }}
                                    id="outlined-basic"
                                    label="Location"
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AddLocationAltIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <DatePicker
                                    onChange={(newValue) => {
                                        setStartDate(
                                            (newValue as Dayjs).toDate()
                                        );
                                    }}
                                />
                                <DatePicker
                                    onChange={(newValue) => {
                                        setEndDate(
                                            (newValue as Dayjs).toDate()
                                        );
                                    }}
                                />
                                <TimePicker
                                    onChange={(newTime) => {
                                        if (startDate) {
                                            const newDate = startDate;
                                            newDate.setTime(
                                                (newTime as Dayjs)
                                                    .toDate()
                                                    .getTime()
                                            );
                                            setStartDate(newDate);
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                        <Button
                            onClick={() => {
                                handleSubmit();
                            }}
                            variant="contained"
                            endIcon={<SendIcon />}
                            disabled={!areAllFieldsComplete()}
                        >
                            Send
                        </Button>
                    </Box>
                </Modal>
            </div>
        </>
    );
}
