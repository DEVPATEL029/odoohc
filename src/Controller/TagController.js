// src/controllers/TagController.js

import Tag from '../models/Tag.js';

// ➔ @desc    Create a new tag
// ➔ @route   POST /api/tags
// ➔ @access  Private (admin recommended)
export const createTag = async (req, res) => {
  const { name, description } = req.body;

  try {
    const tagExists = await Tag.findOne({ name });
    if (tagExists) {
      return res.status(400).json({ message: "Tag already exists." });
    }

    const newTag = new Tag({ name, description });
    await newTag.save();

    res.status(201).json(newTag);
  } catch (err) {
    console.error('Error creating tag:', err);
    res.status(500).json({ message: "Server error creating tag." });
  }
};

// ➔ @desc    Get all tags
// ➔ @route   GET /api/tags
// ➔ @access  Public
export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (err) {
    console.error('Error fetching tags:', err);
    res.status(500).json({ message: "Server error fetching tags." });
  }
};

// ➔ @desc    Delete a tag by ID (optional)
// ➔ @route   DELETE /api/tags/:id
// ➔ @access  Private (admin recommended)
export const deleteTag = async (req, res) => {
  try {
    await Tag.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Tag deleted successfully." });
  } catch (err) {
    console.error('Error deleting tag:', err);
    res.status(500).json({ message: "Server error deleting tag." });
  }
};
