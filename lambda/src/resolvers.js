const { User } =  require('./models/User');
const { StoreItem } =  require('./models/StoreItem');
const { storeItemResolver } = require('./resolverFunctions/storeItem');
const { userExistsResolver } = require('./resolverFunctions/userExists');
const { myItemsResolver}  = require('./resolverFunctions/myItems');
const {campuses} = require('./constants');

const resolvers = {
  Query: {
    storeItems: async (_, {input: {page, filters}}) => {
      const pageSize = 20;
      let condition = {$and: []};
      let items;
      if (filters.length > 0) {
        for (let filter of filters) {
          switch (filter.filterType) {
            case "Campus": {
              const targetEmail = filter.value[0]==='Gmail' ? 'gmail.com' : campuses[filter.value[0]] + '.edu';
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
        items = await StoreItem.find(condition).skip((page-1)*pageSize).limit(pageSize);
      } else {
        items = await StoreItem.find().skip((page-1)*pageSize).limit(pageSize);
      }
      console.log("STORE ITEMS QUERY CALLED ", items.length)
      return items;
    },
    storeItem: storeItemResolver,
    testQuery: () => "Your graphql query is working!",
    user: (_, {id}) => User.findById(id),
    sessionUserDetails: async (_, {input: {accessToken}}) => {
      console.log("session user Query called with: ", accessToken);
      const x = await User.find({accessToken});
      return x.length>0? x[0]: null;
    },
    userExists: userExistsResolver,
    myItems: myItemsResolver
  },
  Mutation: {
    createStoreItem: async (_, {input: {name, description, price, imageUrl, seller, category, neighborhood}}) => {
        const date = new Date().getTime().toString();
        const newStoreItem = new StoreItem({ name, description, price, imageUrl, seller, date, category, neighborhood });
        await User.findByIdAndUpdate(seller.id, {$addToSet: {listedItems: newStoreItem._id}});
        return newStoreItem.save();
    },
    createUser: (_, {input: {firstName, lastName, emailAddress, imageUrl}}) => {
      const newUser = new User({ firstName, lastName, emailAddress, imageUrl });
      return newUser.save();
    },
    createComment: async (_, {input: {commenterId, commenterFullName, storeItemId, commentText, commenterImageUrl}}) => {
      console.log("create comment called");
      await StoreItem.findByIdAndUpdate(storeItemId, {$push: {comments: {commenterId, commenterFullName, commentText, commenterImageUrl}}});
      return {commenterId, commenterFullName, commentText, commenterImageUrl};
    },
    likeItem: async (_, {input: {likerId, storeItemId}}) => {
      console.log(likerId, storeItemId)
      console.log('like item mutation called')
      await User.findByIdAndUpdate(likerId, {$addToSet: {likedItems: storeItemId}})
      await StoreItem.findByIdAndUpdate(storeItemId, {$addToSet: {likes: likerId}});
      return {success: true};
    },
    unlikeItem: async (_, {input: {likerId, storeItemId}}) => {
      console.log('unlike item mutation called')
      await User.findByIdAndUpdate(likerId, {$pull: {likedItems: storeItemId}})
      await StoreItem.findByIdAndUpdate(storeItemId, {$pull: {likes: likerId}});
      return {success: true};
    },
    setAccessToken: async (_, {input: {accessToken, userId, imageUrl }}) => {
      await User.findByIdAndUpdate(userId, {$set: { imageUrl, accessToken}});
      return {success: true};
    },
    clearAccessToken: async (_, {input: {accessToken}}) => {
      console.log("clearToken called")
      await User.findOneAndUpdate({accessToken},{accessToken: ''});
      return {success: true};
    },
    editItem: async (_, {input: {id, name, description, price, imageUrl, category, neighborhood}}) => {
      console.log("edit item mutation called")
      await StoreItem.findByIdAndUpdate(id, {name, description, price, imageUrl, category, neighborhood});
      return {success: true};
    },
    deleteItem: async (_, {input: {id}}) => {
      console.log("delete item mutation called");
      const storeItem = await StoreItem.findById(id);
      for (let likerId of storeItem.likes) {
        await User.findByIdAndUpdate(likerId, {$pull: {likedItems: id}})
      }
      await User.findByIdAndUpdate(storeItem.seller.id, {$pull: {listedItems: id}})
      await StoreItem.findByIdAndDelete(id);
      return {success: true}
    }
  }
};

exports.resolvers = resolvers;
