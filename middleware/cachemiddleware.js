const redis = require("redis");

const PORT_REDIS = process.env.PORT || 6379;

//Yea defining it here again , because node giving unexpected error on exporting it :)
const client = redis.createClient(PORT_REDIS);

exports.cache = (req, res, next) => {

   const {query} = req.body;

   client.get(query, (err, data) => {
        if(err){
            res.status(400).json({
                err
            })
        }

        if(data !== null){
            res.status(200).json({
                data:JSON.parse(data)
            })
            console.log("cache hit");
        }
        else {
            console.log("cache miss");
            next();
        }
    })

}
