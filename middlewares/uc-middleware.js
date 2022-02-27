var underConstruction = (req, res, next) => { 
    res.render('siteuc', {'title' : 'UnderConstruction'})
   // next()
}
export default underConstruction