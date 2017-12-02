const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');
var {User} = require('./../models/user');

beforeEach((done) => {
    //console.log('Removing all data');
    Todo.remove({}).then( () => {
        done();
    });
});

describe('POST todos', () => {
    it('Should create a new todo', (done) => {
        var text = 'Todo test';

        request(app)
            .post('/todos')
            .send({text: text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                Todo.find().then((todos) => {
                    //console.log('Todos ', todos);
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
});