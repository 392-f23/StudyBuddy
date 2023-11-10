import DialogContentText from '@mui/material/DialogContentText';

export default function AvailabilityModal({ availability }) {
    return (
        <div>
            {/* <DialogContentText>
               <div>This Week</div>
            </DialogContentText> */}
            <DialogContentText>

                {availability.map(x=> <div>{x}</div>)}
            </DialogContentText>
        </div>
    );
}