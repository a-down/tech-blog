const router = require('express').Router();
const { Comment } = require('../../models');


// get all posts
router.get('/', async (req, res) => {
  const posts = await Post.findAll().catch((err) => res.status(500).json(err))
  res.status(200).json(posts)
})

router.post('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(500).json('Please log in to leave a comment.')
    return
  }

  try {
  const comment = await Comment.create({
    content: req.body.content,
    post_id: req.body.post_id,
    user_id: req.session.user_id
  })

  res.status(200).json({message: 'Comment created'})
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})




module.exports = router;