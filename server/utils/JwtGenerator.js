import dotenv from "dotenv"
import JwtToken from "jsonwebtoken"

dotenv.config()

const JwtGenerator = (user_id) => {
    const payload = {
        user: user_id
    }
    return JwtToken.sign(payload, process.env.JWTKEY, {expiresIn: "6hr"})
}

export default JwtGenerator;