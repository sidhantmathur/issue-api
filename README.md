# Issue API

An issue tracking API with user authenticatioin, issue documents, comment sub-documents, and authenticated access to updating/deleting documents and subdocuments.

## Important Links

- [Hosted Website Front-End](https://sidhantmathur.github.io/Auth-TicTacToe-client/)
- [Front-End Repo](https://github.com/sidhantmathur/issue-tracker-client)
- [Heroku Hosted API](https://afternoon-beach-76578.herokuapp.com/)

## Development Plan

The data is stored in a document database (MongoDB). GraphQL relationships and SQL table joins were not needed, therefore prioritizing developer experience was paramount and for that reason MongoDB was chosen. 

Issue documents have subdocuments called comments. Anyone can attach a subdocument to anyone else's issue. Issue documents also have special 'enums' called tags. These are a limited set of strings that catagorize issues. These are used to create the Kanban board view on the front end. 

Only owners of issues and comments can edit or delete their respective creations. 

## User Stories

- A user should be able to login/signup
- A user should be able to create an issue. 
- A user should be able to comment on issues. 
- A user should be able to assign a tag to their issues. 
- A user should be able to see all their issues. 
- A user should be able to add images/code to a comment. 

## Technologies Used

#### Front-End

- jQuery
- HTML/CSS/Javascript
- Bootstrap

#### Back-End

- Node.js
  - Express
- MongoDB
  - Mongoose
  - MongoDB Atlas

## Future Development

- Show Owned Comments

## Entity Relationship Diagram

[Planning ERD and Wireframe](https://imgur.com/a/2lvLNqt)
