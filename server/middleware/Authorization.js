import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const Authorization = async (req, res,next) => {
    try {
        const jwtToken = req.header('token');

        if (!jwtToken) {
            return res.status(403).json("Not Authorized")
        }

        const payload = Jwt.verify(jwtToken, process.env.JWTKEY);

        req.user = payload.user;
     
    } catch (err) {
        console.error(err.messsage);
        return res.status(403).json("Not Authorized")
    }
    next();
}
export default Authorization;