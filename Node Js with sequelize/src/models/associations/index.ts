// // models/index.ts
import { User } from '../User/user.model.js'; //
import { Post } from '../Post/post.model.js';
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });
// export { User, Post };
