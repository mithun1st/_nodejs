const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json());


const port = 3000;

app.post("/sign-up", (req, res) => {
    console.log("----------------from req");
    console.log(req.method);
    console.log(req.headers);
    console.log(req.body);
    console.log("----------------/");

    const schema = Joi.object({
        "name": Joi.string().required(),
        "phone": Joi.number().integer(),
        "email": Joi.string().email(),
        "pass": Joi.string().min(3).max(10),
        "isMale": Joi.bool(),
        "createTime": Joi.number(),
        "mp": Joi.object(),
        "li": Joi.array(),
        "dyn": Joi.any()
    });
    const result = schema.validate(req.body);
    console.log(result);
    if (result.error) {
        return res.status(400).send(result.error.details[0]);
    } else {
        return res.status(200).send(true);
    }

});

app.listen(port, () => console.log("listening this port " + port));
