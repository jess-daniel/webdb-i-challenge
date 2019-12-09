const router = require('express').Router();

const db = require("../data/dbConfig");

router.get('/', (req, res) => {
    db.select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            res.status(500).json({ error: "server error", err });
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.select('*')
        .from('accounts')
        .where({ id })
        .first()
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            res.status(500).json({ error: "server error", err });
    })
})

router.post('/', (req, res) => {
    const accountData = req.body;
    if (accountData) {
        db('accounts')
            .insert(accountData, 'id')
            .then(ids => {
                const id = ids[0];

                return db("accounts")
                    .where({ id })
                    .first()
                    .then(account => {
                        res.status(200).json(account)
                    })
            })
            .catch(err => {
                res.status(500).json({ error: "server error", err });
        })
    } else {
        res.status(400).json({ message: "Send correct data" });
    }
})

module.exports = router;