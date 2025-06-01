import Item from '../models/item.model.js';

// get items according to category

export const getItemsByCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const items = await Item.find({ category });
    if (items.length === 0) {
      return res.status(404).json({ message: 'No items found in this category' });
    }
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
}

export const getItemById = async (req, res) => {
  const { itemId } = req.body;

  
  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error: error.message });
  }
}