import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useState } from "react";
import "./Filters.css";

import Form from "react-bootstrap/Form";

function Filters({ course, setCourse, mode, setMode }) {
  const changeCourse = (event) => {
    setCourse(event.target.value);
  };

  const changeMode = (event) => {
    setMode(event.target.value);
  };

  const courses = ["CHEM 330", "MATH 328", "CS 392", "CS 330"];

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

// const Filters = ({ course, setCourse, mode, setMode }) => {
//   const changeCourse = (event) => {
//     setCourse(event.target.value);
//   };

//   const changeMode = (event) => {
//     setMode(event.target.value);
//   };

//   const courses = ["CHEM 330", "MATH 328", "CS 392", "CS 330"];

//   return (
//     <div className="filters">
//       <FormControl sx={{ m: 1, minWidth: 180 }} className="filter">
//         <InputLabel id="demo-simple-select-label">Course</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={course}
//           label="Course"
//           onChange={changeCourse}
//         >
//           <MenuItem value={"All"}>All</MenuItem>
//           {courses.map((courseName) => (
//             <MenuItem key={courseName} value={courseName}>
//               {courseName}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl
//         variant="filled"
//         sx={{ m: 1, minWidth: 120 }}
//         className="filter"
//       >
//         <InputLabel id="demo-simple-select-label">Mode</InputLabel>
//         <Select
//           sx={{ backgroundColor: "white" }}
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={mode}
//           label="Mode"
//           onChange={changeMode}
//         >
//           <MenuItem value={"Both"}>Both</MenuItem>
//           <MenuItem value={"In-Person"}>In-Person</MenuItem>
//           <MenuItem value={"Remote"}>Remote</MenuItem>
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

// export default Filters;
