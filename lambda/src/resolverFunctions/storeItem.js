const { StoreItem } = require('../models/StoreItem');

const storeItemResolver = async (_, {input: {id}}) => {
  const item = await StoreItem.findById(id);
  console.log(item)
  return item;
}

exports.storeItemResolver = storeItemResolver;