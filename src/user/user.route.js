const express = require('express');
const validate = require('./user.request.validator');
const UserService = require('./user.service');

const router = express.Router();
const service = new UserService();

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error) {
        return res.status(400).send({
            message: result.error.details
        });
    }

    const user = await service.save(result.value);
    res.status(201).send(user)
});

module.exports = router;
