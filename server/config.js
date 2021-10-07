module.exports = {
  users: {
    admin: {password: 'password', scopes: 'notes:all notes:read notes:edit'.split(' ')},
    stranger: {password: 'password', scopes: 'notes:all notes:read'.split(' ')}
  },
  jwtSecret: '08098grrgaorugh',
  port: 8080,
  enableAuth: true
}
