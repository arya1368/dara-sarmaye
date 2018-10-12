const express = require('express');
const validate = require('./session.request.validator');
const SessionService = require('./session.service');

const router = express.Router();

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error) {
        return res.status(400).send({
            message: result.error.details
        });
    }

    try {
        const session = await SessionService.newInstance(result.value);
        res.status(201).json({
            token: session.generateToken()
        });
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
});

module.exports = router;