
const express = require('express')
const passport = require('passport')

// const Comment = require('../models/comment')
const Issue = require('../models/issue')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership
// const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Create Comment on Issue
router.post('/comments', requireToken, (req, res, next) => {
  req.body.comment.owner = req.user.id

  const commentData = req.body.comment

  const issueId = commentData.issueId

  Issue.findById(issueId)
    .then(handle404)
    .then(issue => {
      issue.comments.push(commentData)
      return issue.save()
    })
    .then(issue => res.status(201).json({ issue }))
    .catch(next)
})

// Delete Comment on Issue
router.delete('/comments/:id', requireToken, (req, res, next) => {
  const commentId = req.params.id
  const issueId = req.body.comment.issueId

  Issue.findById(issueId)
    .then(handle404)
    .then(issue => {
      requireOwnership(req, issue)
      issue.comments.id(commentId).remove()

      return issue.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Update Comment on Issue
router.patch('/comments/:id', requireToken, (req, res, next) => {
  const commentId = req.params.id
  const commentData = req.body.comment
  const issueId = commentData.issueId

  Issue.findById(issueId)
    .then(handle404)
    .then(issue => {
      requireOwnership(req, issue)
      const comment = issue.comments.id(commentId)
      comment.set(commentData)

      return issue.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
