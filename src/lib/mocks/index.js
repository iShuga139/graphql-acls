module.exports = {
  User: [
    {
      id: 1,
      username: 'jonathan',
      password: 'admin123',
      email: 'jonathan@info.nl',
      emailVerified: true,
      roles: ['ADMIN', 'USER'],
      active: true
    },
    {
      id: 2,
      username: 'josue',
      password: '123pass',
      email: 'josue@info.nl',
      emailVerified: true,
      roles: ['USER'],
      active: true
    },
    {
      id: 3,
      username: 'shuga',
      password: 'pass123',
      email: 'shuga@info.nl',
      emailVerified: false,
      roles: ['USER'],
      active: true
    }
  ],
  AccessToken: {
    1: {
      id: '1',
      token: 'token-1',
      createdAt: Date.now(),
      userId: '1'
    },
    2: {
      id: '2',
      token: 'token-2',
      createdAt: Date.now(),
      userId: '2'
    }
  }
}
