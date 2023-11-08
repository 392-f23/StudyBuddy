import React from "react";
import { Stack, TextField, Button, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import Banner from "../Banner/Banner";
import { useDbUpdate, useDbData } from "../../utilities/firebase";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const PostForm = () => {
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

  const submitPost = () => {
    setShowAlert(true);

    const postUUID = uuidv4();

    const post = {
      title: title,
      time: Date.now(),
      description: description,
      course: course,
      location: location,
      user_id: uid,
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

    // // check for when the course ID is not already in the DB
    // if (!Object.keys(allCourses).includes(course)) {
    //   console.log("not in data");
    // }

    navigate("/");
  };

  return (
    <Stack spacing={3} style={{ padding: 20 }}>
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

      <TextField
        onChange={(e) => setAvailability(e.target.value)}
        defaultValue={availability}
        id="outlined-basic-avail"
        variant="outlined"
        required
        placeholder='Meeting Availibility (list availible time slots in this format: "MWF 05:00-07:00 pm, TuTh 10:00-11:00 am")'
        multiline
        rows={3}
      />

      <Button onClick={submitPost} variant="contained">
        Create
      </Button>
      <Banner />
    </Stack>
  );
};
