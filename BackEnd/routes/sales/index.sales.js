const express = require('express');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;

const config = require('../../config');

const router = express.Router();

let jsonError = { Status: "Fail" };
let maxRows = 1000;

router.get('/', async (req, res) => {
	let conn;
	try {
		conn = await oracledb.getConnection(config.connection);
		let rows = await conn.execute(
			'BEGIN SALES.PKG_SALES.prc_sel_sales(:cursor); END;',
			{ cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } }
		);
		sales = await rows.outBinds.cursor.getRows(maxRows);
		res.status(200).send({sales});
	} catch (err) {
		res.status(500).send(jsonError);
	} finally {
		if (conn) {
			await conn.close();
		}
	}
});

router.get('/:id', async (req, res) => {
	let conn;
	try {
		conn = await oracledb.getConnection(config.connection);
		let row = await conn.execute(
			'BEGIN SALES.PKG_SALES.prc_sel_sale(:id, :cursor); END;',
			{
				id: req.params.id,
				cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
			}
		);
		sale = await row.outBinds.cursor.getRows(1);
		res.status(200).send(JSON.stringify(sale));
	} catch (err) {
		res.status(500).send(jsonError);
	} finally {
		if (conn) {
			await conn.close();
		}
	}
});

router.post('/', async (req, res) => {
	let conn;
	try {
		conn = await oracledb.getConnection(config.connection);
		let row = await conn.execute(
			'BEGIN SALES.PKG_SALES.prc_add_sale(:region, :employee, :product, :quantity, :dollars, :createdID); END;',
			{
				region: req.body.Region,
				employee: req.body.Employee,
				product: req.body.Product,
				quantity: req.body.Quantity,
				dollars: req.body.Dollars,
				createdID: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
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

router.delete('/:id', async (req, res) => {
	let conn;
	try {
		conn = await oracledb.getConnection(config.connection);

		let row = await conn.execute(
			'BEGIN SALES.PKG_SALES.prc_del_sale(:saleid, :deletedID); END;',
			{
				saleid: req.params.id,
				deletedID: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
			}
		);
		sale = await row.outBinds;
		res.status(200).send(JSON.stringify(sale));
	} catch (err) {
		res.status(500).send(jsonError);
	} finally {
		if (conn) {
			await conn.close();
		}
	}
});

module.exports = router;
