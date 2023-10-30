import DialogContentText from '@mui/material/DialogContentText';

export default function AvailabilityModal({ contact }) {
    return (
        <div>
            <DialogContentText>
                This Week:
            </DialogContentText>
            <DialogContentText>
                Monday: 3-5pm
                <br />
                Tuesday: 5-6pm
                <br />
                Friday: 8-11pm
            </DialogContentText>
        </div>
    );
}