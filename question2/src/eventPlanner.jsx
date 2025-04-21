import React, { useState } from "react";

export default function EventPlanner() {
  // State to store form inputs
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("Birthday");

  // List of all events
  const [events, setEvents] = useState([]);

  // Track whether we're in Add or Update mode
  const [isEditing, setIsEditing] = useState(false);

  // Track index of the event being edited
  const [editIndex, setEditIndex] = useState(null);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      name: eventName,
      date: eventDate,
      type: eventType,
    };

    if (isEditing) {
      // Update the existing event
      const updatedEvents = [...events];
      updatedEvents[editIndex] = newEvent;
      setEvents(updatedEvents);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new event
      setEvents([...events, newEvent]);
    }

    // Clear form
    setEventName("");
    setEventDate("");
    setEventType("Birthday");
  };

  // Load event details into form for editing
  const handleEdit = (index) => {
    const event = events[index];
    setEventName(event.name);
    setEventDate(event.date);
    setEventType(event.type);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">
        {isEditing ? "Update Event" : "Add Event"}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option>Birthday</option>
          <option>Wedding</option>
          <option>Conference</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Event" : "Add Event"}
        </button>
      </form>

      {/* Event List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Planned Events:</h3>
        {events.length === 0 ? (
          <p className="text-gray-500">No events added yet.</p>
        ) : (
          <ul className="space-y-3">
            {events.map((event, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{event.name}</p>
                  <p className="text-sm text-gray-600">
                    {event.date} - {event.type}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
