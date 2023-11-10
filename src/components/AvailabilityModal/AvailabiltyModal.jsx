import DialogContentText from '@mui/material/DialogContentText';

export default function AvailabilityModal({ availability }) {
    return (
        <div>
            {availability.map((x, index) => (
                <DialogContentText key={index}>
                    {x}
                </DialogContentText>
            ))}
        </div>
    );
}