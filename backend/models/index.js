const User = require('./User');
const Story = require('./Story');
const {connectToDb} = require('../configs/db.config');

User.hasMany(Story, { foreignKey: 'authorId', onDelete: 'CASCADE' });
Story.belongsTo(User, { as: 'author' });

(async () => {
  await connectToDb(); // { force: true }
})();

module.exports = {
  User,
  Story,
};
