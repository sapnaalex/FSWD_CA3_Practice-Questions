import React, { useState } from "react";

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    frequency: "Daily",
    startDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.frequency || !formData.startDate) {
      alert("Please fill in all fields.");
      return;
    }

    if (isEditing) {
      const updatedHabits = [...habits];
      updatedHabits[editIndex] = formData;
      setHabits(updatedHabits);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setHabits([...habits, formData]);
    }

    setFormData({
      name: "",
      frequency: "Daily",
      startDate: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(habits[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Habit Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Frequency:</label>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {isEditing ? "Update Habit" : "Add Habit"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Your Habits</h2>
        {habits.length === 0 ? (
          <p className="text-gray-500">No habits tracked yet.</p>
        ) : (
          <ul className="space-y-3">
            {habits.map((habit, index) => (
              <li
                key={index}
                className="border p-3 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{habit.name}</p>
                  <p className="text-sm text-gray-600">
                    Frequency: {habit.frequency} | Start Date: {habit.startDate}
                  </p>
                </div>
                <button
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  onClick={() => handleEdit(index)}
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
