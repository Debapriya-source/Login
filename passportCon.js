const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')



 function initialize(passport , getUserByEmail , getUserById ){
    const  authenticateUser= async (email , password , done) => {

        const user = getUserByEmail(email)
        if(user==null){
        return done( null , false , { message : 'No user with That email'})
        }
        try{
            if(await bcrypt.compare( password , user.password)){
                return done(null , user)
            } 
            else{
                return done(null , flase , {message : 'Password is incorrect '})
            }

        } catch(e){
            console.log(e)
            return done(e)
        }
            

         

    }
    passport.use(new LocalStrategy({ usernameFeild : 'email' , 
                                     passwordField : 'password'  }, authenticateUser))
    passport.serializeUser((user , done) => {
        return done(null , user.id)
    })
    passport.deserializeUser((id , done) => {
        return done(null , getUserById(id))
    })
   


}

module.exports = initialize