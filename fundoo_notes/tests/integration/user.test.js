import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';
let jwToken = "";
let noteID ="";
let passwordToken = "";

describe('Fundoo Notes API Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }
    
    done();
  });
  //User Registeration
  describe('User Registeration', () => {
    const inputBody = {
      "firstName":"Urmila",
      "lastName":"Dasari",
      "emailId":"urmila@gmail.com",
      "password":"123456"
     }
    it('Given user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/registeration')
        .send(inputBody)
        .end((err, res) => {
          expect(res.body.code).to.be.equal(201);
          done();
        });
    });
  });
 
  //User Login 
  describe('User Login', () => {
    const inputBody = {
      "emailId":"urmila@gmail.com",
      "password":"123456"
     }
    it('Given user details should fetch details from database', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          jwToken = res.body.data;
          expect(res.body.code).to.be.equal(202);
          done();
        });
    });
  });
    
//Forget Password
  describe('Forget Password', () => {
    const inputBody = {
      "emailId":"urmila@gmail.com"
     }
    it('Given user detials must retrive password from database', (done) => {
      request(app)
        .post('/api/v1/users/forgetpassword')
        .send(inputBody)
        .end((err, res) => {
          passwordToken = res.body.data;
          expect(res.body.code).to.be.equal(200);
          done();
        });
    });
  });


  //Reset Password
    describe('Reset Password', () => {
      const inputBody = {
        "password":"urmila123"
       }
      it('Given user details must reset password with new and update it in database', (done) => {
        request(app)
          .put('/api/v1/users/resetpassword')
          .set('Authorization',`Bearer ${passwordToken}`)
          .send(inputBody)
          .end((err, res) => {
            expect(res.body.code).to.be.equal(200);
            done();
          });
      });
    });

  //Add new Note
  describe('Add New Note', () => {
    const inputBody = {
      "Title":"Learning",
      "Description":"Learning NodeJS",
      "Color":"Black",
      "isArchived":"false",
      "isTrash":"false"
     }
    it('Given user token should add note to user profile from database', (done) => {
      request(app)
        .post('/api/v1/note/addNote')
        .set('Authorization',`Bearer ${jwToken}`)
        .send(inputBody)
        .end((err, res) => {
          noteID = res.body.data._id;
          expect(res.body.code).to.be.equal(201);
          done();
        });
    });
  });
  
//Get Note by ID
  describe('Get Note By ID', () => {
    it('Given user id details should fetch particular note from database', (done) => {
      request(app)
        .get(`/api/v1/note/${noteID}`)
        .set('Authorization',`Bearer ${jwToken}`)
        .end((err, res) => {
          expect(res.body.code).to.be.equal(200);
          done();
        });
    });
  });



//Get All Notes
describe('Get All Notes', () => {
  it('Given token should fetch all notes of the user from database', (done) => {
    request(app)
      .get('/api/v1/note/getAllNote')
      .set('Authorization',`Bearer ${jwToken}`)
      .end((err, res) => {
        expect(res.body.code).to.be.equal(200);
        done();
      });
  });
});


//Upadate note by ID
describe('Update By ID', () => {
  const inputBody = {
    "Title":"Learnings",
    "Color": "White"
  }
  it('Given token should fetch particular note and update it to database', (done) => {
    request(app)
        .put(`/api/v1/note/${noteID}`)
        .set('Authorization',`Bearer ${jwToken}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.body.code).to.be.equal(200);
          done();
      });
  });
});


//Delete Note By ID
describe('Delete Note by ID', () => {
  it('Given user id details should fetch particular note and delete it from database', (done) => {
    request(app)
      .delete(`/api/v1/note/${noteID}`)
      .set('Authorization',`Bearer ${jwToken}`)
      .end((err, res) => {
        expect(res.body.code).to.be.equal(200);
        done();
      });
  });
});

//isArchived note
describe('Archive Note by ID', () => {
  it('Given user id details should get archived from database', (done) => {
    request(app)
      .put(`/api/v1/note/${noteID}/isArchive`)
      .set('Authorization',`Bearer ${jwToken}`)
      .end((err, res) => {
        expect(res.body.code).to.be.equal(202);
        done();
      });
  });
});



//isTrashed note
describe('Trash Note by ID', () => {
  it('Given user id details should get trashed from database', (done) => {
    request(app)
      .put(`/api/v1/note/${noteID}/isDelete`)
      .set('Authorization',`Bearer ${jwToken}`)
      .end((err, res) => {
        expect(res.body.code).to.be.equal(200);
        done();
      });
  });
});

});
