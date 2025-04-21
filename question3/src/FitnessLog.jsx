import React, { useState } from "react";

export default function FitnessLog() {
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    sets: "",
    reps: "",
    weight: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.sets.trim() || !formData.reps.trim() || !formData.weight.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (isEditing) {
      const updatedExercises = [...exercises];
      updatedExercises[editIndex] = formData;
      setExercises(updatedExercises);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setExercises([...exercises, formData]);
    }

    setFormData({
      name: "",
      sets: "",
      reps: "",
      weight: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(exercises[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Fitness Log</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Exercise Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sets:</label>
          <input
            type="number"
            name="sets"
            value={formData.sets}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Reps:</label>
          <input
            type="number"
            name="reps"
            value={formData.reps}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Weight Used (kg):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {isEditing ? "Update Exercise" : "Add Exercise"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Workout Log</h2>
        {exercises.length === 0 ? (
          <p className="text-gray-500">No exercises logged yet.</p>
        ) : (
          <ul className="space-y-3">
            {exercises.map((exercise, index) => (
              <li
                key={index}
                className="border p-3 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{exercise.name}</p>
                  <p className="text-sm text-gray-600">
                    {exercise.sets} sets × {exercise.reps} reps @ {exercise.weight}kg
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
