import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

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

  //negative User Registeration
  describe('User Registeration', () => {
    const inputBody = {
      "firstName":"Urmila",
      "lastName":"Da",
      "emailId":"urmila@gmail.com",
      "password":"123456"
     }
    it('Invalid data should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/registeration')
        .send(inputBody)
        .end((err, res) => {
          expect(res.body.code).to.be.equal(500);
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

  //Invalid User Login 
  describe('User Login', () => {
    const inputBody = {
      "emailId":"urmila@gmail.com",
      "password":"urmila"
     }
    it('Given invalid password should throw error', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          //jwToken = res.body.data;
          expect(res.body.code).to.be.equal(400);
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

  //Invalid Forget Password
  describe('Forget Password', () => {
    const inputBody = {
      "emailId":"urmi@gmail.com"
     }
    it('Given invalid mail id should throw error', (done) => {
      request(app)
        .post('/api/v1/users/forgetpassword')
        .send(inputBody)
        .end((err, res) => {
          //passwordToken = res.body.data;
          expect(res.body.code).to.be.equal(400);
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
          noteID = res.body.data.id;
          expect(res.body.code).to.be.equal(201);
          done();
        });
    });
  });
  
  //Invalid Add new Note
  describe('Add New Note', () => {
    const inputBody = {
      "Title":"Learning",
      "Description":"Learning NodeJS",
      "Color":"Black",
      "isArchived":"false",
      "isTrash":"false"
     }
    it('Given details without authentication should throw error', (done) => {
      request(app)
        .post('/api/v1/note/addNote')
        //.set('Authorization',`Bearer ${jwToken}`)
        .send(inputBody)
        .end((err, res) => {
          //noteID = res.body.data._id;
          expect(res.body.code).to.be.equal(400);
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

//Invalid Get All Notes
describe('Get All Notes', () => {
  it('Given token without authentication should throw error', (done) => {
    request(app)
      .get('/api/v1/note/getAllNote')
      .set('Authorization',` ${jwToken}`)
      .end((err, res) => {
        expect(res.body.code).to.be.equal(400);
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

//Invalid Upadate note by ID
describe('Update By ID', () => {
  const inputBody = {
    "Title":"Learnings",
    "Color": "White"
  }
  it('Given token without id should throw invalid id error', (done) => {
    request(app)
        .put(`/api/v1/note/`)
        .set('Authorization',`Bearer ${jwToken}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.body.code).to.be.equal(404);
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

//Invalid Delete Note By ID
describe('Delete Note by ID', () => {
  it('Given token without id should throw invalid id error', (done) => {
    request(app)
      .delete(`/api/v1/note/`)
      .set('Authorization',`Bearer ${jwToken}`)
      .end((err, res) => {
        expect(res.body.code).to.be.equal(404);
        done();
      });
  });
});


});
