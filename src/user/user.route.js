const express = require('express');
const validate = require('./user.request.validator');
const dal = require('./user.dal');

const router = express.Router();

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error) {
        return res.status(400).send({
            message: result.error.details
        });
    }

    const user = await dal.save(result.value);
    res.status(201).send(user)
});

module.exports = router;
