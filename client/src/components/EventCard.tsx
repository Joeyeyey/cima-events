import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip, Typography } from '@mui/material';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import EditIcon from '@mui/icons-material/Edit';
// import { Delete } from "@mui/icons-material";
import { EventDocument } from '../../../server/src/models/Event';
import { API_URL } from '../api/config';
import { render } from 'react-dom';
import { useState } from 'react';

interface Props {
  event: EventDocument;
  handleDeleteCard: (event: EventDocument) => void;
  handleEditCard: (event: EventDocument) => void;
}

const EventCard = ({ event, handleDeleteCard, handleEditCard }: Props) => {
  if (!event) {
    return <></>;
  }

  const { title, startDate, endDate, location } = event;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);;

  function renderTitleAndLocation(title: string, location: string): string {
    return `${title ?? ''} @ ${location ?? ''}`;
  }

  function renderDate(isStartDate: boolean, date: Date | undefined): string {
    if (!date) {
      return 'no date!';
    }
    const currentDate: Date = new Date(date);
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    const startString: string = isStartDate ? 'Start' : 'End';
    return `${startString}: ${formattedDate} ${formattedTime}`;
  }

  const renderButtons = () => {
    // Hide buttons in prod
    const isEditable: boolean = `${API_URL}`.includes('localhost');
    if (!isEditable) {
      return <></>;
    }

    return (
      <>
        <Tooltip title="Edit" followCursor>
          <IconButton onClick={() => { handleEditCard(event) }}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete" followCursor>
          <IconButton
            onClick={() => {
              setIsDialogOpen(true);
              // handleDeleteCard(event);
            }}>
            <DeleteForeverTwoToneIcon />
          </IconButton>
        </Tooltip>

        <Dialog
          open={isDialogOpen}
          onClose={() => {setIsDialogOpen(false)}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Delete ${event.title}?`}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => {setIsDialogOpen(false)}}>No</Button>
            <Button onClick={() => {handleDeleteCard(event)}} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
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
        <CardContent className='cardContent'>
          <Typography variant="h5" component="h2">
            {renderTitleAndLocation(title, location)}
          </Typography>
          <Typography variant="h5" component="h2">
            {renderDate(true, startDate)}
          </Typography>
          <Typography variant="h5" component="h2">
            {renderDate(false, endDate)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          {renderButtons()}
        </CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default EventCard;
