import React from "react";
import { Stack, TextField, Button, Alert, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import Banner from "../Banner/Banner";
import { useDbUpdate, useDbData } from "../../utilities/firebase";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { DeleteOutline } from "@mui/icons-material";

export const PostForm = () => {
  // HARD-CODED VALUE!!!
  const auth = getAuth();
  const [uid, setUid] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        console.log("auth errors out.");
      }
    });
    return () => unsubscribe();
  }, []);

  const [userData, setUserData] = useDbData("/users/" + uid);
  //console.log(userData);

  useEffect(() => {
    if (typeof userData !== "undefined") {
      setAvailability(userData.availability);
      setCourses(userData.courses.split(", "));
    }
  }, [userData]);

  const [showAlert, setShowAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([""]);
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");

  const [courseData, error1] = useDbData(`/courses/${course}`);
  const [updateCourseData, result1] = useDbUpdate(`/courses/${course}`);
  const [updatePosts, result2] = useDbUpdate(`/posts/`);

  const navigate = useNavigate();


  const [availabilityDate, setAvailabilityDate] = useState();
  const [availabilityStartTime, setAvailabilityStartTime] = useState();
  const [availabilityEndTime, setAvailabilityEndTime] = useState();
  const [availabilityTimeList, setAvailabilityTimeList] = useState([]);

  const AvailabilityListItem = ({ date, startTime, endTime, onClick }) => (
    <Stack
      direction="row"
      alignItems="center"
      gap={2}
      justifyContent="space-between"
    >
      <div>
        {date} at {dayjs(startTime).format("hh:mm A")}-
        {dayjs(endTime).format("hh:mm A")}
      </div>
      <IconButton onClick={() => onClick(date, startTime, endTime)}>
        <DeleteOutline />
      </IconButton>
    </Stack>
  );

  const addDateTime = () => {

    console.log(availabilityTimeList)
    if ((availabilityStartTime, availabilityEndTime, availabilityDate)) {
      setAvailabilityTimeList([
        ...availabilityTimeList,
        {
          date: dayjs(availabilityDate).format("ddd, MMM D"),
          start_time:  availabilityStartTime,
          end_time: availabilityEndTime,
        },
      ]);
      setAvailabilityDate();
      setAvailabilityStartTime();
      setAvailabilityEndTime();
    }
  };

  const removeDateTime = (
    availabilityDate,
    availabilityStartTime,
    availabilityEndTime
  ) => {
    const infoToRemove = {
      date: availabilityDate,
      start_time: availabilityStartTime,
      end_time: availabilityEndTime,
    };
    // Use the filter function to create a new array with the item removed
    const updatedAvailabilityTimeList = availabilityTimeList.filter((info) => {
      // Compare the properties of the 'info' object with 'infoToRemove' to check for equality
      return (
        info.date !== infoToRemove.date ||
        info.start_time !== infoToRemove.start_time ||
        info.end_time !== infoToRemove.end_time
      );
    });
    // Update the 'availabilityTimeList' state with the new array
    setAvailabilityTimeList(updatedAvailabilityTimeList);
  };



  const submitPost = () => {
    setShowAlert(true);

    let avalabilityListCopy = [...availabilityTimeList];
    avalabilityListCopy = avalabilityListCopy.map(x => {return {...x, start_time: dayjs(x.start_ime).format("hh:mm A"), end_time: dayjs(x.end_ime).format("hh:mm A")}})


    const postUUID = uuidv4();

    const post = {
      title: title,
      time: Date.now(),
      description: description,
      course: course,
      location: location,
      user_id: uid,
      availability: avalabilityListCopy
    };

    updatePosts({ [postUUID]: post });

    // if the course does not currently have any posts
    if (!Object.hasOwn(courseData, "posts")) {
      const newCourseData = {
        course_name: courseData.course_name,
        posts: [postUUID],
      };
      updateCourseData(newCourseData);
    } else {
      courseData.posts.push(postUUID);
      updateCourseData(courseData);
    }
    navigate("/");
  };


  return (
    <Stack spacing={3} style={{ padding: 20, marginBottom: 100 }}>
      <h2>Make a post</h2>

      {showAlert && (
        <Alert severity="success">You have successfully created a post</Alert>
      )}

      <TextField
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        id="outlined-basic-title"
        label="Title"
        variant="outlined"
      />
      <TextField
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        id="outlined-basic-desc"
        label="Description"
        multiline
        variant="outlined"
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-course"
          value={course}
          label="Course"
          onChange={(e) => setCourse(e.target.value)}
        >
          {courses.map((courseName) => (
            <MenuItem key={courseName} value={courseName}>
              {courseName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        id="outlined-basic-loca"
        label="Location"
        variant="outlined"
      />

      <h3>Availability</h3>

      {availabilityTimeList.map((x, index) => (
        <AvailabilityListItem
          key={index}
          startTime={x.start_time}
          endTime={x.end_time}
          date={x.date}
          onClick={() => removeDateTime(x.date, x.start_time, x.end_time)}
        />
      ))}

      <DatePicker
        label="Date"
        onChange={(value) => setAvailabilityDate(new Date(value))}
        value={availabilityDate}
      />

      <Stack direction="row" gap={2}>
        <TimePicker
          views={["hours", "minutes"]}
          onChange={(value) => setAvailabilityStartTime(value)}
          value={availabilityStartTime}
          label="Start time"
        />
        <TimePicker
          views={["hours", "minutes"]}
          onChange={(value) => setAvailabilityEndTime(value)}
          value={availabilityEndTime}
          label="End time"
        />
      </Stack>

      <Button onClick={addDateTime}>Add</Button>

      {/* <TextField
        onChange={(e) => setAvailability(e.target.value)}
        defaultValue={availability}
        id="outlined-basic-avail"
        variant="outlined"
        required
        placeholder='Meeting Availibility (list availible time slots in this format: "MWF 05:00-07:00 pm, TuTh 10:00-11:00 am")'
        multiline
        rows={3}
      /> */}

      <Button onClick={submitPost} variant="contained">
        Create
      </Button>
      <Banner />
    </Stack>
  );
};
