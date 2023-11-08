import DialogContentText from '@mui/material/DialogContentText';

export default function ContactModal({ contact }) {
    return (
        <div>
            <DialogContentText>
                Email: {contact.email}
            </DialogContentText>
            {contact.phone_number != "" && <DialogContentText>
                Phone Number: {contact.phone_number}
            </DialogContentText>}
        </div>
    );
}