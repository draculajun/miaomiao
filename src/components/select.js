const SelectApi = {

    selectAll(oldValue, list, newList, selectedValue) {
        const allValues = [];
        // 保留所有值
        for (const item of list) {
            allValues.push(item.name)
        }
        // 用来储存上一次的值，可以进行对比
        const oldVal = oldValue.length === 1 ? oldValue[0] : [];
        // 若是全部选择
        if (selectedValue.includes('---ALL---')) newList = allValues;
        // 取消全部选中 上次有 当前没有 表示取消全选
        if (oldVal.includes('---ALL---') && !selectedValue.includes('---ALL---')) newList = [];
        // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
        // 新老数据都有全部选中
        if (oldVal.includes('---ALL---') && selectedValue.includes('---ALL---')) {
            const index = selectedValue.indexOf('---ALL---');
            selectedValue.splice(index, 1); // 排除全选选项
            newList = selectedValue;
        }
        // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
        if (!oldVal.includes('---ALL---') && !selectedValue.includes('---ALL---')) {
            if (selectedValue.length === allValues.length - 1) {
                newList = ['---ALL---'].concat(selectedValue)
            } else {
                newList = selectedValue;
            }
        }
        // 储存当前最后的结果 作为下次的老数据
        oldValue[0] = newList;
        return oldValue[0];
    }

}

export default SelectApi