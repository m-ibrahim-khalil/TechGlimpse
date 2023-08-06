'use strict';

const express = require('express');

const StoriesRouter = express.Router();
const { StoriesControler } = require('../controllers');
const {
  AuthenticationMiddleware,
  StoryAuthorizationMiddleware,
  uploadImage,
} = require('../middlewares');

StoriesRouter.route('/')
  .get(StoriesControler.getAllStories)
  .post(AuthenticationMiddleware, uploadImage, StoriesControler.createStory);

StoriesRouter.route('/:id')
  .get(StoriesControler.getStoryById)
  .put(
    AuthenticationMiddleware,
    StoryAuthorizationMiddleware,
    uploadImage,
    StoriesControler.updateById
  )
  .delete(
    AuthenticationMiddleware,
    StoryAuthorizationMiddleware,
    StoriesControler.deleteById
  );

StoriesRouter.route('/author/:authorId').get(
  StoriesControler.getStroiesByAuthor
);

module.exports = StoriesRouter;
