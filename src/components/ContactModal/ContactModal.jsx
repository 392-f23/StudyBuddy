import DialogContentText from '@mui/material/DialogContentText';

export default function ContactModal({ contact }) {
    const email = "wirecutter2024@ece.com";
    const phone_number = "(773)202-LUNA";

    return (
        <div>
            <DialogContentText>
                Email: {email}
            </DialogContentText>
            <DialogContentText>
                Phone Number: {phone_number}
            </DialogContentText>
        </div>
    );
}