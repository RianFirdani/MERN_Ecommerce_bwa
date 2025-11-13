const cookieOptions = (req)=>{
    const isProduction = process.env.NODE_ENV === "Production"

    return {
        httponly : true,
        secure : isProduction && req.hostname !== "localhost",
        sameStie : "Strict",
        path : "/",
        maxAge : 60*60*24*1000
    }
}