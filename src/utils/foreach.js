let arr = [{ "name": "aaa", "age": ["1", "3", "5"] }, { "name": "bbb", "age": ["2", "4", "6"] }];

let input = "2";
let res;
function matchAge(arr, input) {

    arr.forEach(ele => {
        console.log(JSON.stringify(ele));

        for (let i = 0; i < ele.age.length; i++) {

            if (ele.age[i] === input) {

                res = ele.name;

            }

        }

    })

}

 matchAge(arr, input);

console.log(res);
