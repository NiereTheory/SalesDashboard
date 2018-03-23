const express = require('express');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;

const connection = require('../../config');

const router = express.Router();

let jsonError = { Status: "Fail" };
let maxRows = 1000;

router.get('/', (req, res) => {
	let getAll = async () => {
		let conn;
		try {
			conn = await oracledb.getConnection(connection);
			let result = await conn.execute(
				'BEGIN SALES.PKG_SALES.prc_sel_sales(:cursor); END;',
				{ cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } }
			);
			response = await result.outBinds.cursor.getRows(maxRows);
			res.status(200).send(JSON.stringify(response));
		} catch (err) {
			res.status(500).send(jsonError);
		} finally {
			if (conn) {
				await conn.close();
			}
		}
	}
	getAll();
});

router.get('/:id', (req, res) => {
	let getOne = async () => {
		let conn;
		try {
			conn = await oracledb.getConnection(connection);
			let result = await conn.execute(
				'BEGIN SALES.PKG_SALES.prc_sel_sale(:id, :cursor); END;',
				{
					cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
					id: req.params.id
			 	}
			);
			response = await result.outBinds.cursor.getRows(1);
			res.status(200).send(JSON.stringify(response));
		} catch (err) {
			res.status(500).send(jsonError);
		} finally {
			if (conn) {
				await conn.close();
			}
		}
	}
	getOne();
});

router.post('/', (req, res) => {
	let addOne = async () => {
		let conn;
		try {
			conn = await oracledb.getConnection(connection);
			let InvoiceID = req.body.InvoiceID;
			let SaleAmount = req.body.SaleAmount;
			console.log(req.body);
			let result = await conn.execute(
				'BEGIN SALES.PKG_SALES.prc_add_sale(:invoiceid, :saleamount, :createdID); END;',
				{
					invoiceid: { val: InvoiceID },
					saleamount: { val: SaleAmount },
					createdID: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
			 	}
			);
			response = await result.outBinds;
			res.status(200).send(JSON.stringify(response));
		} catch (err) {
			res.status(500).send(jsonError);
		} finally {
			if (conn) {
				await conn.close();
			}
		}
	}
	addOne();
});

router.delete('/', (req, res) => {
	let delOne = async () => {
		let conn;
		try {
			conn = await oracledb.getConnection(connection);
			let InvoiceID = req.body.InvoiceID;
			let InvoiceLineID = req.body.InvoiceLineID;
			let result = await conn.execute(
				'BEGIN SALES.PKG_SALES.prc_del_sale(:invoiceid, :invoicelineid, :deletedID); END;',
				{
					invoiceid: { val: InvoiceID },
					invoicelineid: { val: InvoiceLineID },
					deletedID: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
			 	}
			);
			response = await result.outBinds;
			res.status(200).send(JSON.stringify(response));
		} catch (err) {
			res.status(500).send(jsonError);
		} finally {
			if (conn) {
				await conn.close();
			}
		}
	}
	delOne();
});

module.exports = router;
