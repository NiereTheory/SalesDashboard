const express = require('express');
const oracledb = require('oracledb');
const jwt = require('jsonwebtoken');
oracledb.outFormat = oracledb.OBJECT;

const config = require('../../config');
const authenticate = require('../../middleware/auth');

const router = express.Router();

let jsonError = { Status: "Fail" };
let maxRows = 1000;

router.get('/kpis', async (req, res) => {
	let conn;
	try {
		conn = await oracledb.getConnection(config.connection);
		let rows = await conn.execute(
			'BEGIN SALES.PKG_DASH.prc_get_saleskpis(:cursor); END;',
			{ cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } }
		);
		kpis = await rows.outBinds.cursor.getRows(maxRows);
		res.status(200).send({kpis});
	} catch (err) {
		res.status(500).send(jsonError);
	} finally {
		if (conn) {
			await conn.close();
		}
	}
});

router.get('/monthly', async (req, res) => {
	let conn;
	try {
		conn = await oracledb.getConnection(config.connection);
		let rows = await conn.execute(
			'BEGIN SALES.PKG_DASH.prc_get_salesbymonth(:cursor); END;',
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

router.get('/regionally', async (req, res) => {
	let conn;
	try {
		conn = await oracledb.getConnection(config.connection);
		let rows = await conn.execute(
			'BEGIN SALES.PKG_DASH.prc_get_salesbyregion(:cursor); END;',
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

router.get('/top', async (req, res) => {
	let conn;
	try {
		conn = await oracledb.getConnection(config.connection);
		let rows = await conn.execute(
			'BEGIN SALES.PKG_DASH.prc_get_topsales(:cursor); END;',
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

router.get('/mine', authenticate, async (req, res) => {
    let conn;
	try {
		conn = await oracledb.getConnection(config.connection);
		let rows = await conn.execute(
			'BEGIN SALES.PKG_DASH.prc_get_salesbyemployee(:emp, :cursor); END;',
			{
				emp: req.user,
				cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } 
			}
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

module.exports = router;
