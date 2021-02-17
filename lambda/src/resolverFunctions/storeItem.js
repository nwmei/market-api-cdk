const { StoreItem } = require('../models/StoreItem');

const storeItemResolver = async (_, {input: {id}}) => {
  const item = await StoreItem.findById(id);
  return item;
}

exports.storeItemResolver = storeItemResolver;