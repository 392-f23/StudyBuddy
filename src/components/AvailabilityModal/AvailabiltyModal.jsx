import DialogContentText from '@mui/material/DialogContentText';

export default function AvailabilityModal({ availability }) {
    return (
        <div>
            <DialogContentText>
                This Week:
            </DialogContentText>
            <DialogContentText>
                {availability}
            </DialogContentText>
        </div>
    );
}