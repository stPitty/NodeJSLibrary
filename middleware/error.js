error = (req, res) => {
  res.render('error/404', {
    title: '404 | страница не найдена',
  })
}

module.exports = error;