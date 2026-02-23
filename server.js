const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'yourSecretKey', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Configuring the local strategy for authentication
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Replace with your user authentication logic
    // For example, if the username is 'user' and the password is 'pass', authenticate
    if (username === 'user' && password === 'pass') {
      return done(null, { username: 'user' });
    }
    return done(null, false, { message: 'Incorrect credentials.' });
  }
));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.username);
});

// Deserialize user
passport.deserializeUser((username, done) => {
  // Replace with your user retrieval logic
  done(null, { username: username });
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello ${req.user.username}, welcome to your dashboard!`);
  } else {
    res.redirect('/login');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
