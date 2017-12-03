const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');
var {User} = require('./../models/user');

const todos = [{
    text: 'First test todo'
},{
    text: 'Second test todo'
}];

beforeEach((done) => {
    //console.log('Removing all data');
    Todo.remove({}).then( () => {
        return Todo.insertMany(todos).then((docs) => done());
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
                Todo.find({text: text}).then((todos) => {
                    //console.log('Todos ', todos);
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('Get todos', () => {
    it('Should retrieve a todo', (done) => {
        request(app)
        .get('/todos')
        .send()
        .expect(200)
        .expect((res) => {
            //console.log(res);
            expect(res.body.todos.length).toBe(2);
            done();
        }).catch ((e) => {
            done(e);
        });
    });
});