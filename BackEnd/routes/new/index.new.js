const express = require('express');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;

const authenticate = require('../../middleware/auth');
const config = require('../../config');

const router = express.Router();

let jsonError = { Status: "Fail" };
let maxRows = 100;

// Removing the below as just hard-coding 4 regions into html saves on bandwidth
// router.get('/regions', async (req, res) => {
// 	console.log('started');
// 	let conn;
// 	try {
// 		conn = await oracledb.getConnection(config.connection);
// 		let rows = await conn.execute(
// 			'BEGIN SALES.PKG_NEW_SALE.prc_get_regions(:cursor); END;',
// 			{ cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } }
// 		);
// 		regions = await rows.outBinds.cursor.getRows(maxRows);
// 		res.status(200).send({regions});
// 	} catch (err) {
// 		res.status(500).send(jsonError);
// 	} finally {
// 		if (conn) {
// 			await conn.close();
// 		}
// 	}
// });

router.get('/employees', async (req, res) => {
	let conn;
	try {
		conn = await oracledb.getConnection(config.connection);
		let rows = await conn.execute(
			'BEGIN SALES.PKG_NEW_SALE.prc_get_employees(:cursor); END;',
			{ cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } }
		);
		employees = await rows.outBinds.cursor.getRows(maxRows);
		res.status(200).send({employees});
	} catch (err) {
		res.status(500).send(jsonError);
	} finally {
		if (conn) {
			await conn.close();
		}
	}
});

router.post('/sale', authenticate, async (req, res) => {
	let conn;
	try {
		conn = await oracledb.getConnection(config.connection);
		let row = await conn.execute(
			'BEGIN SALES.PKG_NEW_SALE.prc_add_sale(:region, :employee, :date, :dollars, :createdid); END;',
			{
				region: req.body.Region,
				employee: req.body.Employee,
				date: req.body.Date,
				dollars: req.body.Dollars,
				createdid: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
			}
		);
		response = await row.outBinds;
		res.status(200).send(JSON.stringify(response));
	} catch (err) {
		res.status(500).send(jsonError);
	} finally {
		if (conn) {
			await conn.close();
		}
	}
});

module.exports = router;
