const homeController = (req,  res) => {
    res.setHeader("Content-Type", "text/html");
    res.render('home', {'title' : 'Home'})
}

export {homeController}