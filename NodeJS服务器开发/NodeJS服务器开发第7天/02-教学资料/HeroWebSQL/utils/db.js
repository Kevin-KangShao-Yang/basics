// 导入模块
const fs = require('fs')
const path = require('path')
// 基地址 json文件的 绝对路径
const fileName = path.join(__dirname, './data/hero.json')

function getAllhero() {
  const heros = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
  return heros
}

module.exports = {
  // 1.获取所有数据方法 - 返回所有 isDelete = false 的对象 ------------------------------
  //   return 对象数组(isDelete = false)
  getHeros() {
    const heros = JSON.parse(fs.readFileSync(fileName, 'utf-8'));

    return heros
      .filter(v => !v.isDelete)
      .map(({ id, name, skill, icon }) => {
        return {
          id,
          name,
          skill,
          icon
        }
      })
  },
  // 2.新增 数据 方法 ------------------------------------------------------------
  //   参数：对象解构-含 三个 值
  //   return bool;(成功 - ture /  失败 - false)
  addHero({ name, skill, icon }) {
    let heros = getAllhero()
    heros.push({
      id: heros.length + 1,
      name,
      skill,
      icon,
      isDelete: false
    })
    // 保存回去
    if (!fs.writeFileSync(fileName, JSON.stringify(heros))) {
      return true
    } else {
      return false
    }
  },
  // 3.根据id获取数据 方法 ------------------------------------------------------------
  //   参数：想要获取的 对象的id
  //   return id匹配的对象 / null;
  getHeroById(id) {
    const heros = this.getHeros()
    const filterArr = heros.filter(v => {
      return v.id == id
    })
    if (filterArr[0]) {
      return filterArr[0]
    } else {
      return null
    }
  },
  // 4.根据id删除英雄 (软删除) 方法 -- 将 isDelete 属性设置为 true ------------------------------
  //   参数：想要删除的 对象的id
  //   return  bool;(成功 - ture /  失败 - false)
  deleteHeroById(id) {
    //4.1 获取 所有 英雄对象 -- 数组
    const heros = getAllhero();
    //4.2 筛选数组中 id = 4 的元素 -- 数组
    const filterArr = heros.filter(v => {
      return v.id == id
    })
    //4.3 判断 数组中 第 0 个元素 是否存在
    if (filterArr[0]) {
      //4.4 将 目标元素 的 isDelete 属性改为 true
      //    代表 被标记为 删除
      filterArr[0].isDelete = true
      // 保存回去
      if (!fs.writeFileSync(fileName, JSON.stringify(heros))) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
  // 5.编辑英雄 方法 ----------------------------------------------------------------------------------
  //   参数：对象解构-含 三个 值
  //   return  bool;(成功 - ture /  失败 - false)
  editHero({ id, name, skill, icon }) {
    let heros = getAllhero()
    const filterArr = heros.filter(v => {
      return v.id == id
    })
    // console.log(filterArr);
    if (filterArr[0]) {
      // 如果 有要修改的信息，则保存，如果没有，则保持原来的数据
      if (name) {
        filterArr[0].name = name;
      }
      if (skill) {
        filterArr[0].skill = skill;
      }
      if (icon) {
        filterArr[0].icon = icon;
      }
      // 保存回去
      if (!fs.writeFileSync(fileName, JSON.stringify(heros))) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
