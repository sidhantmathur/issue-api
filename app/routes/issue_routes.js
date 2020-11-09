
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

// Show User's Issues
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

module.exports = router
