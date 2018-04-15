const express = require('express');
const oracledb = require('oracledb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
oracledb.outFormat = oracledb.OBJECT;

const config = require('../../config');
const authenticate = require('../../middleware/auth');

const router = express.Router();

let jsonError = { Status: "Fail" };
let maxRows = 1;

router.post('/', async (req, res) => {
	let conn;
	try {
		conn = await oracledb.getConnection(config.connection);
		let row = await conn.execute(
			'BEGIN SALES.PKG_LOGIN.prc_get_user(:userID, :user); END;',
			{
				userID: req.body.user,
				user: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
			}
		);
        response = await row.outBinds;
        dbuser = response.user.split(' ');

        if (await bcrypt.compare(req.body.pass, dbuser[1])) {
            let token = jwt.sign(
                {
                    id: dbuser[0]
                }
                , config.secret
                , { expiresIn: '2h' }
            );
            res.send({userID: dbuser[0], token});
        }
        else {
            throw "Invalid credentials";
        }

        
	} catch (err) {
		res.status(500).send(jsonError);
	} finally {
		if (conn) {
			await conn.close();
		}
	}
});

// router.get('/valid', authenticate, async(req, res) => {
//     try {
//         res.status(200).send({success: true});
//     }
//     catch (err) {
//         res.status(401).send();
//     }
// });

module.exports = router;
