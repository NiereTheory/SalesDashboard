const express = require('express');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;

const connection = require('../../config');

const router = express.Router();

let jsonError = {
	Error: "Something went wrong!"
};
let maxRows = 1000;

router.get('/', (req, res) => {
	let getAll = async () => {
		let conn;

		try {
			conn = await oracledb.getConnection(connection);
			let result = await conn.execute(
				'BEGIN HR.PKG_SEL_EMPLOYEES.prc_sel_employees(:cursor); END;',
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
				'BEGIN HR.PKG_SEL_EMPLOYEES.prc_sel_employee(:id, :cursor); END;',
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

module.exports = router;

// SIMPLE SELECT (non proc based):
// router.get('/', (req, res) => {
// 	let getAll = async () => {
// 		let conn;
//
// 		try {
// 			conn = await oracledb.getConnection(connection);
// 			let result = await conn.execute(`SELECT * FROM hr.employees`);
// 			res.status(200).send(JSON.stringify(result.rows));
// 		} catch (err) {
// 			res.status(500).send(jsonError);
// 		} finally {
// 			if (conn) {
// 				await conn.close();
// 			}
// 		}
// 	}
// 	getAll();
// });
