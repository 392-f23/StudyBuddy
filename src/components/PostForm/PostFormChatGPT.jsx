import React, { useState } from 'react';

export const PostFormChatGPT = () => {
  // State to manage form input values
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Function to handle form submission
  const handleSubmit = () => {
    // Validate and format the availability data
    const availabilityListCopy = [
      { date: availability, start: startTime, end: endTime },
      // Add more availability objects as needed
    ];

    // Create the post object
    const post = {
      title: title,
      time: Date.now(),
      description: description,
      course: course,
      location: location,
    //   user_id: uid, // You need to replace uid with the actual user ID
      availability: availabilityListCopy,
    //   userImage: userData.photoURL,
    //   userName: userData.displayName,
    };

    // Now you can send the 'post' object to your database or perform other actions
    console.log('Post Data:', post);
  };

  return (
    <div>
      {/* Your form inputs */}
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <label>Course:</label>
      <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} />

      <label>Location:</label>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

      <label>Availability Date:</label>
      <input type="date" value={availability} onChange={(e) => setAvailability(e.target.value)} />

      <label>Start Time:</label>
      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

      <label>End Time:</label>
      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

      {/* Submit button */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

// export default PostFormChatGPT;
