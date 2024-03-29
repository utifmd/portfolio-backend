import SchemaUser from "../models/schemaUser.js"
import bcryptjs from "bcryptjs"

export const signUp = async (req, resp) => {
    const { name, email, password } = req.body

    try {
        const existingUser = await SchemaUser.findOne({ email })
        const hashedpassword = await bcryptjs.hash(password, 12)
        const hashedid = await bcryptjs.hash(email, 12)
        
        if(existingUser)
            return resp.status(404).json({message: `User already exists.`}) 
        
        const result = await SchemaUser.create({ id: hashedid, name: name, email: email, password: hashedpassword })
        
        resp.status(200).json({ result })
    } catch (error) {
        resp.status(404).json({message: `Something went wrong.`})
    }
}

export const signIn = async (req, resp) => {
    const { email, password } = req.body

    try {
        const existingUser = await SchemaUser.findOne({ email })

        if(!existingUser) 
            return resp.status(404).json({message: `User doesn't exist.`})

        bcryptjs.compare(password, existingUser.password, 
            async (err, isMatch) => {

            if (isMatch) {
                console.log('Encrypted password is: ', password);
                console.log('Decrypted password');
                // await SchemaUser.findOneAndUpdate({"email": email}, { $inc: { 
                //     "invalidAttempt": 1
                // }})
    
                resp.status(200).json({result: existingUser})
            }
            
            if (!isMatch) {
                
                // If password doesn't match the following
                // message will be sent
                console.log(' is not encryption of ' + password);
                resp.status(403).json({message: `Invalid creadentials.`})
            }
        })
    } catch (error) {

        resp.status(404).json({message: `Something went wrong.`})
    }
}