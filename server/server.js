const app = process.env.NODE_ENV !== 'production'
  ? require('../app').default
  : require('./app').default;

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
