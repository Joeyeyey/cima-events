import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import { API_URL } from "../api/config";
import { useState } from "react";
import ICimaEvent from "../interfaces/ICimaEvent";

interface Props {
    event: ICimaEvent;
    handleDeleteCard: (event: ICimaEvent) => void;
    handleEditCard: (event: ICimaEvent) => void;
}

const EventCard = ({ event, handleDeleteCard, handleEditCard }: Props) => {
    if (!event) {
        return <></>;
    }

    const { title, startDate, endDate, location } = event;
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    function renderTitleAndLocation(
        title: string,
        location: string | undefined
    ): string {
        return `${title ?? ""} @ ${location ?? ""}`;
    }

    function renderDate(isStartDate: boolean, date: Date | undefined): string {
        if (!date) {
            return `no ${isStartDate ? "start" : "end"} date!`;
        }
        const currentDate: Date = new Date(date);
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();
        const startString: string = isStartDate ? "Start" : "End";
        return `${startString}: ${formattedDate} ${formattedTime}`;
    }

    const renderButtons = () => {
        // Hide buttons in prod
        const isEditable: boolean = `${API_URL}`.includes("localhost");
        if (!isEditable) {
            return <></>;
        }

        return (
            <>
                <Tooltip title="Edit" followCursor>
                    <IconButton
                        onClick={() => {
                            handleEditCard(event);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Delete" followCursor>
                    <IconButton
                        onClick={() => {
                            setIsDialogOpen(true);
                        }}
                    >
                        <DeleteForeverTwoToneIcon />
                    </IconButton>
                </Tooltip>

                <Dialog
                    open={isDialogOpen}
                    onClose={() => {
                        setIsDialogOpen(false);
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Delete event "${event.title}?"`}
                    </DialogTitle>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setIsDialogOpen(false);
                            }}
                        >
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                handleDeleteCard(event);
                            }}
                            autoFocus
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    };

    return (
        // <CardActionArea>
        //   <Card>
        //     <CardMedia
        //       component="img"
        //       height="140"
        //       image="https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        //       alt="green iguana"
        //     />
        //     <CardContent className='cardContent'>
        //       <Typography variant="h5" component="h2">
        //         {renderTitleAndLocation(title, location)}
        //       </Typography>
        //       <Typography variant="h5" component="h2">
        //         {renderDate(true, startDate)}
        //       </Typography>
        //       <Typography variant="h5" component="h2">
        //         {renderDate(false, endDate)}
        //       </Typography>
        //     </CardContent>
        //     <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        //       {renderButtons()}
        //     </CardActions>
        //   </Card>
        // </CardActionArea>
        // <Card sx={{ maxWidth: 345 }}>
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="event photo"
                />
                <CardContent className="cardContent">
                    <Typography variant="h5" component="h2">
                        {renderTitleAndLocation(title, location)}
                    </Typography>
                    {/* Need to determine whether or not time should be 
                    combined with the start and end date or if they should be 
                    seperate fields. (Allows for optional end dates / times.) */}
                    <Typography variant="h5" component="h2">
                        {renderDate(true, startDate)}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {renderDate(false, endDate)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <CardActions
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                    {renderButtons()}
                </CardActions>
                {/* <Button size="small" color="primary"> Share </Button> */}
            </CardActions>
        </Card>
    );
};

export default EventCard;
