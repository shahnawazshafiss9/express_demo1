import 'dotenv/config';
import express from 'express';
const app  = express()
/*jwt token */
import jwt from 'jsonwebtoken';
app.use(express.json());
/*end jwt token */
const port = process.env.port || '4000'

let refreshTokens = []

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
   
  if (refreshToken == null) return res.sendStatus(401)
   
//   if (!refreshTokens.includes(refreshToken))
//   console.log(refreshToken);
//    return res.sendStatus(403)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      console.log(user);
   // if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
  })
   
/* jwt related*/
app.post('/login',(req, res) => {
    const username = req.body.username;
    const user = {name: username}
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
   
    res.json({accessToken: accessToken, refreshToken: refreshToken});
});
/*end jwt related*/
 function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20s'});

 }
 
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

