// PostFilter.js
import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const PostFilter = ({ courses, onFilterChange }) => {
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleCourseChange = (event) => {
    const newCourse = event.target.value;
    setSelectedCourse(newCourse);
    onFilterChange(newCourse);
  };

  return (
    <FormControl>
      <InputLabel htmlFor="courseFilter">Filter by Course</InputLabel>
      <Select
        value={selectedCourse}
        onChange={handleCourseChange}
        inputProps={{
          name: "course",
          id: "courseFilter",
        }}
      >
        <MenuItem value="">
          <em>All Courses</em>
        </MenuItem>
        {courses.map((course) => (
          <MenuItem key={course} value={course}>
            {course}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PostFilter;
