import DialogContentText from "@mui/material/DialogContentText";

export default function ProfileModal({ profile }) {
  return (
    <div>
      <DialogContentText>Grad Year: {profile.year}</DialogContentText>
      <DialogContentText>Major: {profile.major}</DialogContentText>
      <DialogContentText>Mode Preference: {profile.mode}</DialogContentText>
    </div>
  );
}
