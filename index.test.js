describe('My test suite', () => {
    test('My test case', () => {
        expect(true).toBe(true);
    });
});


const { registerUser } = require('./controllers/userController');
   

const mockRequest = () => {
    return {
        body: {
            name: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        }
    }
}

const mockResponse = () => {
    return {
        status:jest.fn().mockReturnThis(),
        json:jest.fn()
    }
}

describe('POST /api/register', () => {
    test('It should respond with 201 and user details if registration is successful', async () => {
        const newUser = {
            name: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        };

        const mockReq = mockRequest();
        const mockRes = mockResponse();
        const response = await registerUser(mockReq, mockRes)

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('name', newUser.name);
        expect(response.body).toHaveProperty('email', newUser.email);
        expect(response.body).not.toHaveProperty('password');
    });
});