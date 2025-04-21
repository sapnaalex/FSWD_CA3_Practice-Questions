import React, { useState } from "react";

export default function MovieTracker() {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    status: "To Watch",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.year.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (isEditing) {
      const updatedMovies = [...movies];
      updatedMovies[editIndex] = formData;
      setMovies(updatedMovies);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setMovies([...movies, formData]);
    }

    setFormData({
      title: "",
      year: "",
      status: "To Watch",
    });
  };

  const handleEdit = (index) => {
    setFormData(movies[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Movie Tracker</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Release Year:</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="To Watch">To Watch</option>
            <option value="Watched">Watched</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Movie" : "Add Movie"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Movie List</h2>
        {movies.length === 0 ? (
          <p className="text-gray-500">No movies added yet.</p>
        ) : (
          <ul className="space-y-3">
            {movies.map((movie, index) => (
              <li
                key={index}
                className="border p-3 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {movie.title} ({movie.year})
                  </p>
                  <p className="text-sm text-gray-600">Status: {movie.status}</p>
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
