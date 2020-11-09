
const express = require('express')
const passport = require('passport')

const Issue = require('../models/issue')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Create Issue
router.post('/issues', requireToken, (req, res, next) => {
  req.body.issue.owner = req.user.id

  Issue.create(req.body.issue)
    .then(issue => {
      res.status(201).json({ issue: issue.toObject() })
    })
    .catch(next)
})
// Delete Issue
router.delete('/issues/:id', requireToken, (req, res, next) => {
  Issue.findById(req.params.id)
    .then(handle404)
    .then(issue => {
      requireOwnership(req, issue)
      issue.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
// Show all Issues
router.get('/issues', (req, res, next) => {
  Issue.find()
    .then(issues => {
      return issues.map(issue => issue.toObject())
    })
    .then(issues => res.status(200).json({ issues: issues }))
    .catch(next)
})

// Show all issues by current user
// router.get('/user', requireOwnership, (req, res, next) => {
//   Issue.find({owner: req.user.id})// .exec()
//     .then(issues => {
//       return issues.map(issue => issue.title).sort().toObject()
//       // return issues.map(issue => issue.toObject())
//     })
//     .then(issues => res.status(200).json({ issues: issues }))
//     .catch(next)
// })

// Show one Issue
router.get('/issues/:id', (req, res, next) => {
  Issue.findById(req.params.id)
    .then(handle404)
    .then(issue => res.status(200).json({ issue: issue.toObject() }))
    .catch(next)
})

// Update Issue
router.patch('/issues/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.issue.owner

  Issue.findById(req.params.id)
    .then(handle404)
    .then(issue => {
      requireOwnership(req, issue)
      return issue.updateOne(req.body.issue)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// // examples update -> show from user
// router.patch('/issues/:id', requireToken, removeBlanks, (req, res, next) => {
//   // if the client attempts to change the `owner` property by including a new
//   // owner, prevent that by deleting that key/value pair
//   delete req.body.issues.owner

//   Issue.findById(req.params.id)
//     .then(handle404)
//     .then(example => {
//       // pass the `req` object and the Mongoose record to `requireOwnership`
//       // it will throw an error if the current user isn't the owner
//       requireOwnership(req, example)

//       // pass the result of Mongoose's `.update` to the next `.then`
//       return example.updateOne(req.body.example)
//     })
//     // if that succeeded, return 204 and no JSON
//     .then(() => res.sendStatus(204))
//     // if an error occurs, pass it to the handler
//     .catch(next)
// })

router.get('/issues-user', requireToken, (req, res, next) => {
  console.log(req.user)
  Issue.find({'owner': req.user.id})
    .then(handle404)
    .then(issues => {
      return issues.map(issue => {
        requireOwnership(req, issue)
        return issue.toObject()
      })
    })
    .then(issues => {
      console.log(issues)
      res.status(200).json({ issues: issues })
    })
    .catch(next)
})

// router.get('/issues/:owner', requireToken, (req, res, next) => {
//   req.body.issues.owner = req.params.owner
//   Issue.find({owner: req.body.owner})
//     .then(issues => {
//       requireOwnership(req, issues)
//       return issues.map(issue => issue.toObject())
//     })
//     .then(issues => res.status(200).json({ issues: issues }))
//     .catch(next)
// })

module.exports = router
