import { StoreItem, User, Comment } from '../models';

const storeItemResolver = async (_, {input: {id}}) => {
  const item = await StoreItem.findById(id);
  console.log(item)
  return item;
}

export default storeItemResolver;