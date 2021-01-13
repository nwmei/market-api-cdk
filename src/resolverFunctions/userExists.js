import { User } from '../models';

const userExistsResolver = async (_, {input: {emailAddress}}) => {
  const user = await User.find({emailAddress});
  let id = "";
  if (user.length > 0) {
    id = user[0]._id;
  }
  return ({
    exists: (user.length>0),
    id
  });
}

export default userExistsResolver;