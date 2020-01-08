const express = require('express')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const lodashId = require('lodash-id')
const dataValidator = require('../middlewares/validator')

const adapter = new FileSync('db.json')
const db = low(adapter)

db._.mixin(lodashId)

const router = express.Router()

/**
 * 获取所有员工
 */
router.get('/list', async function(req, res) {
  res.status(200).json({
    success: true,
    data: db.get('employees').value()
  })
})

/**
 * 获取单个员工
 */
router.get('/', dataValidator({
  query: {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      }
    },
    required: ['id']
  }
}), async function(req, res) {
  const { id } = req.query
  res.status(200).json({
    success: true,
    data: db.get('employees').getById(id)
  })
})

/**
 * 创建员工
 */
router.post('/create', dataValidator({
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      gender: {
        type: 'string',
        enum: ['m', 'f']
      },
      birthday: {
        type: 'string',
        format: 'date'
      },
      employmentDate: {
        type: 'string',
        format: 'date'
      },
      mobilePhone: {
        type: 'string'
      },
      email: {
        type: 'string',
        format: 'email'
      }
    },
    required: ['name', 'gender', 'birthday', 'employmentDate', 'mobilePhone', 'email']
  }
}), async function(req, res) {
  const ret = db
    .get('employees')
    .insert(req.body)
    .write()
  res.status(200).json({
    success: true,
    data: ret
  })
})

/**
 * 删除员工
 */
router.get('/delete', dataValidator({
  query: {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      }
    },
    required: ['id']
  }
}), async function(req, res) {
  const { id } = req.query
  db.get('employees').remove({ id }).write()
  res.status(201).json({
    success: true,
    data: {}
  })
})

/**
 * 更新员工
 */
router.post('/update', dataValidator({
  query: {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      }
    },
    required: ['id']
  },
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      gender: {
        type: 'string',
        enum: ['m', 'f']
      },
      birthday: {
        type: 'string',
        format: 'date'
      },
      employmentDate: {
        type: 'string',
        format: 'date'
      },
      mobilePhone: {
        type: 'string'
      },
      email: {
        type: 'string',
        format: 'email'
      }
    }
  }
}), async function(req, res) {
  const { id } = req.query
  const ret = db.get('employees')
    .getById(id)
    .assign(req.body)
    .write()
  res.status(200).json({
    success: true,
    data: ret
  })
})

module.exports = router
