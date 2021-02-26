const { User } =  require('../models/User');
const { StoreItem } =  require('../models/StoreItem');

const myItemsResolver = async (_, {input: {id, likedPage, listedPage, filters}}) => {
  const user = await User.findById(id)
  const pageSize = 20;
  let condition = {$and: []};
  let likedByMe;
  let listedByMe;
  if (filters.length > 0) {
    for (let filter of filters) {
      switch (filter.filterType) {
        case "Campus": {
          const targetEmail = filter.value[0]==='off-campus' ? '.com' : filter.value[0] + '.edu';
          condition.$and.push({"seller.emailAddress": {$regex: `${targetEmail}$`}});
          break;
        }
        case "Category": {
          condition.$and.push({category: filter.value[0]})
          break;
        }
        case "Neighborhood": {
          condition.$and.push({neighborhood: filter.value[0]})
          break;
        }
        case "Price": {
          const priceMin = parseInt(filter.value[0]);
          const priceMax = parseInt(filter.value[1]);
          condition.$and.push({price: {$gte: priceMin, $lte: priceMax}})
          break;
        }
      }
    }
    likedByMe = await StoreItem.find({_id: {$in: user.likedItems},...condition}).skip((likedPage-1)*pageSize).limit(pageSize);
    listedByMe = await StoreItem.find({_id: {$in: user.listedItems}, ...condition}).skip((listedPage-1)*pageSize).limit(pageSize);
  } else {
    likedByMe = await StoreItem.find({_id: {$in: user.likedItems}}).skip((likedPage-1)*pageSize).limit(pageSize);
    listedByMe = await StoreItem.find({_id: {$in: user.listedItems}}).skip((listedPage-1)*pageSize).limit(pageSize);
  }
  //console.log(likedByMe)
  return {
    likedByMe, listedByMe
  }
}

exports.myItemsResolver = myItemsResolver;