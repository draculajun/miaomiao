const SelectApi = {

    allowAll(list, key, value){
        list.unshift({
            [key]: '---ALL---',
            [value]: '全部'
        });
        return list;
    },

    getSelectedItems(oldKeys, list, selectedValue, key) {
        const allValues = [];
        let newKeys = [];
        // 保留所有值
        for (const item of list) {
            allValues.push(item[key])
        }
        // 用来储存上一次的值，可以进行对比
        const oldVal = oldKeys.length === 1 ? oldKeys[0] : [];
        // 若是全部选择
        if (selectedValue.includes('---ALL---')) newKeys = allValues;
        // 取消全部选中 上次有 当前没有 表示取消全选
        if (oldVal.includes('---ALL---') && !selectedValue.includes('---ALL---')) newKeys = [];
        // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
        // 新老数据都有全部选中
        if (oldVal.includes('---ALL---') && selectedValue.includes('---ALL---')) {
            const index = selectedValue.indexOf('---ALL---');
            selectedValue.splice(index, 1); // 排除全选选项
            newKeys = selectedValue;
        }
        // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
        if (!oldVal.includes('---ALL---') && !selectedValue.includes('---ALL---')) {
            if (selectedValue.length === allValues.length - 1) {
                newKeys = ['---ALL---'].concat(selectedValue)
            } else {
                newKeys = selectedValue;
            }
        }
        // 储存当前最后的结果 作为下次的老数据
        oldKeys[0] = newKeys;
        return oldKeys[0];
    }

}

export default SelectApi