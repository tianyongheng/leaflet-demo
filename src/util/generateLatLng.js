//获取左上角坐标和左下角坐标,随机生成10条数据
export default function(left,right,top,bottom,num=1000){
    const tmp = [];
    console.log(arguments);
    console.log(num);
    for(let i =0;i<num;i++){
    const randomX = (right-left)*Math.random()+left;
    const randomY = (top-bottom)*Math.random()+bottom;
        tmp.push({latitude:randomX,longitude:randomY});
    }
    return tmp;
}