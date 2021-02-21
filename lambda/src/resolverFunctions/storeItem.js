const { StoreItem } = require('../models/StoreItem');

const storeItemResolver = async (_, {input: {id}}) => {
  let item;
  try {
    item = await StoreItem.findById(id);
  } catch (e) {
    return {
      success: false
    }
  }
  return item;
  // const item = await StoreItem.findById(id);
  // console.log(await item);
  // return item;
}

exports.storeItemResolver = storeItemResolver;