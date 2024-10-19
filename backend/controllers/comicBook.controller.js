import ComicBook from "../models/comicBook.model.js";
import express from "express";
const app = express();
app.use(express.json());


// Controller to fetch all comic books
export const getAllComics = async (req, res) => {
  try {
    // Fetch all comic books from the database
    const comics = await ComicBook.find({});
    
    // Respond with the list of comic books
    res.status(200).json(comics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comic books', error });
  }
};

export const updateComicBook = async (req, res) => {
  try {
    const comicId = req.params.id; // Get comic ID from URL parameters
    const updateData = req.body; // Get updated fields from the request body

    // Find comic book by ID and update it with new data
    const updatedComic = await ComicBook.findByIdAndUpdate(comicId, updateData, {
      new: true, // Return the updated document
      runValidators: true,         
    });
    console.log('Updated Comic:', updatedComic);


    if (!updatedComic) {
      return res.status(404).json({ message: 'Comic book not found' });
    }

    // Return the updated comic book
    res.status(200).json({ message: 'Comic book updated successfully', data: updatedComic });
  } catch (error) {
    res.status(500).json({ message: 'Error updating comic book', error });
  }
};


export const createComic = async (req, res) => {
    try {
        const { bookName, authorName, yearOfPublication, price, discount, numberOfPages, condition, description } = req.body;

        // Create a new comic book document
        const newComic = new ComicBook({
            bookName,
            authorName,
            yearOfPublication,
            price,
            discount,
            numberOfPages,
            condition,
            description
        });

        // Save the comic book to the database
        const savedComic = await newComic.save();

        // Send a response back with the saved comic
        res.status(201).json({
            message: 'Comic book created successfully!',
            comic: savedComic
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            message: 'Failed to create comic book',
            error: error.message
        });
    }
};

export const deleteComic = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters

    try {
        // Find the comic book by ID and delete it
        const deletedComic = await ComicBook.findByIdAndDelete(id);

        // Check if the comic book was found and deleted
        if (!deletedComic) {
            return res.status(404).json({
                message: 'Comic book not found'
            });
        }

        // Send a success response
        res.status(200).json({
            message: 'Comic book deleted successfully!',
            comic: deletedComic
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to delete comic book',
            error: error.message
        });
    }
};

