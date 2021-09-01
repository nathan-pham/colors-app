module.exports = class Controller {
    static post(res) {
        return res.status(405).json({message: "Method not allowed"})
    }

    static required(res) {
        return res.status(400).json({message: "Missing required fields"})
    }

    static ok(res) {
        return res.status(200).json({message: "Ok"})
    }
}

// export const adminware = async (req, res, next) => {
//     if(req.method == "POST") {
//         await run(req, res, verify)
//         await run(req, res, admin)

//         await next(req.body || {})   
//     } else {
//         Controller.post(res)
//     }
// }