/**
 * ��������
 * �ӵڶ�������ʼ��������ǰ�Աȣ������ǰһ��С����ǰһ��������λ�ã���������ǰ�Աȣ�ֱ����0λ�����Ա���
 * �������Ҳһ����ǰ�Ա�
 * @param array
 * @returns {*}
 */
function insertSort(array){
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        var item;
        for(var i=1; i<array.length; i++){
            for(var j = i; j>0; j--){
                if(array[j] < array[j-1]){
                    item = array[j];
                    array[j] = array[j-1];
                    array[j-1] = item;
                }
            }
        }
        return array;
    }else {
        return 'array is not an Array!';
    }
}
var arr = [1,4,5,2,8,3,9,0,8,9,6,7];
console.log(insertSort(arr));