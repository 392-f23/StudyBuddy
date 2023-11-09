import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import "./Filters.css";
import { useDbData } from "../../utilities/firebase";
import { useAuth } from "../../utilities/firebase";

import Form from "react-bootstrap/Form";

function Filters({ courses, setCourses, setCourse, setMode }) {
  const [user] = useAuth();
  const [users, result] = useDbData("/users");

  useEffect(() => {
    if (typeof users !== "undefined") {
      const userInfo = users[user.uid];
      const coursesString = userInfo.courses;
      setCourses(coursesString.split(", "));
    }
  }, [users]);

  const changeCourse = (event) => {
    setCourse(event.target.value);
  };

  const changeMode = (event) => {
    setMode(event.target.value);
  };

  return (
    <div className="filters">
      <Form.Select
        className="filter"
        onChange={changeCourse}
        aria-label="Default select example"
      >
        <option value="All">All Courses</option>
        {courses.map((courseName) => (
          <option key={courseName} value={courseName}>
            {courseName}
          </option>
        ))}
      </Form.Select>
      <Form.Select
        className="filter"
        onChange={changeMode}
        aria-label="Default select example"
      >
        <option value="Both">Both</option>
        <option value="Remote">Remote</option>
        <option value="In-Person">In-Person</option>
      </Form.Select>
    </div>
  );
}

export default Filters;
