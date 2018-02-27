const userModel = require('../models/users')



function fetchUser (req,res){

    let user = req.params.id

userModel.find({'username': `${user}`})
.then(users => res.status(200).send(users))
.catch(err => {
    console.log(err);
    return res.status(500).send({ error: err })

})


}


module.exports = {fetchUser}