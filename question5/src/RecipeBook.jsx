import React, { useState } from "react";

export default function RecipeBook() {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    instructions: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.ingredients.trim() || !formData.instructions.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (isEditing) {
      const updatedRecipes = [...recipes];
      updatedRecipes[editIndex] = formData;
      setRecipes(updatedRecipes);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setRecipes([...recipes, formData]);
    }

    setFormData({
      name: "",
      ingredients: "",
      instructions: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(recipes[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Recipe Book</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Recipe Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ingredients:</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={3}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Instructions:</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={3}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {isEditing ? "Update Recipe" : "Add Recipe"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Your Recipes</h2>
        {recipes.length === 0 ? (
          <p className="text-gray-500">No recipes added yet.</p>
        ) : (
          <ul className="space-y-3">
            {recipes.map((recipe, index) => (
              <li
                key={index}
                className="border p-3 rounded flex justify-between items-start"
              >
                <div>
                  <p className="font-medium">{recipe.name}</p>
                  <p className="text-sm text-gray-600">
                    <strong>Ingredients:</strong> {recipe.ingredients}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Instructions:</strong> {recipe.instructions}
                  </p>
                </div>
                <button
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 self-start"
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
