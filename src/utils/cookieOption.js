 const cookieOptions = (req)=>{
    const isProduction = process.env.NODE_ENV === "Production"

    return {
        httpOnly : true,
        secure : isProduction && req.hostname !== "localhost",
        sameSite : "Strict",
        path : "/",
        maxAge : 60*60*24*1000
    }
}

module.exports = cookieOptions