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
				'BEGIN SALES.PKG_SEL_REGIONS.prc_sel_regions(:cursor); END;',
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
				'BEGIN SALES.PKG_SEL_REGIONS.prc_sel_region(:id, :cursor); END;',
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
			let regionName = req.body.regionName;
			console.log(req.body);
			let result = await conn.execute(
				'BEGIN SALES.PKG_SEL_REGIONS.prc_add_region(:name, :createdID); END;',
				{
					name: { val: regionName },
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

router.delete('/:id', (req, res) => {
	let delOne = async () => {
		let conn;
		try {
			conn = await oracledb.getConnection(connection);
			let IdToDelete = req.params.id;
			let result = await conn.execute(
				'BEGIN SALES.PKG_SEL_REGIONS.prc_del_region(:regionID, :deleted_regionID); END;',
				{
					regionID: IdToDelete,
					deleted_regionID: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
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
