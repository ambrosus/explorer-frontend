import _ from 'lodash';

const arr = [1, 2, 3,];

const concatArr = _.uniq(_.concat(arr, arr2));
const arr3 = _.map(arr, (item) => item * 2);
const filtered = _.filter(arr, (n) => n > 1);
const result = _.find(arr, (item) => item === 1);
const arr4 = _.clone(arr);
const arr5 = _.cloneDeep(arr);
// need sort array using lodaash
const arr6 = _.sortBy(arr, (item) => item);

