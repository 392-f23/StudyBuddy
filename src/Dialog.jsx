import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function InfoDialog({ children, title, open, handleClose}) {
  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent id="alert-dialog-description">
          {/* <DialogContentText > */}
            {children}
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Close</Button>
          <Button onClick={handleClose}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  );
}

// import Button from '@mui/material/Button';
// import ContactModal from './ContactModal';
// import AvailabilityModal from './AvailabiltyModal';
// import InfoDialog from './Dialog';

// const App = () => {
//     const [openContact, setOpenContact] = useState(false);
  
//     const handleClickOpenContact = () => {
//       setOpenContact(true);
//     };
  
//     const handleCloseContact = () => {
//       setOpenContact(false);
//     };

//     const [openAvailability, setOpenAvailability] = useState(false);
  
//     const handleClickOpenAvailability = () => {
//       setOpenAvailability(true);
//     };
  
//     const handleCloseAvailability = () => {
//       setOpenAvailability(false);
//     };

//     const [contact, SetContact] = useState({});
  
//     return (
//       <div className="App">
//         <Button variant="outlined" onClick={handleClickOpenContact}>
//           Open contact dialog
//         </Button>
//         <Button variant="outlined" onClick={handleClickOpenAvailability}>
//           Open Availability dialog
//         </Button>
//         <InfoDialog title={"Contact"} open={openContact} handleClose={handleCloseContact}>
//           <ContactModal contact={contact} />
//         </InfoDialog>
//         <InfoDialog title={"Availability"} open={openAvailability} handleClose={handleCloseAvailability}>
//           <AvailabilityModal contact={contact} />
//         </InfoDialog>
//       </div>
//     );
//   };