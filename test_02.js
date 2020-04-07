/*var xhr = new XMLHttpRequest();
xhr.open('GET','https://usefulapis.net/api');
xhr.addEventListener('load',onLoadFunc, false);
xhr.send(null);*/


const canvas = document.getElementById("im");
const canvas2 = document.getElementById('canvas2');
const canvas3 = document.getElementById('canvas3');
const ctx2 = canvas2.getContext( '2d' );
const ctx3 = canvas3.getContext('2d');
//request.setRequestHeader('Access-Control-Allow-Headers','*');
//draw(canvas,imagePath);

    // 画像切り取り
    ctx2.drawImage( canvas,0,0,80,80,0,0,80,80);
        //300, 300, 80, 80, 0, 0, 80, 80);
    
    // make ImageData
    var cv = document.getElementById('canvas2');

    // kokomade!!!!!!!!!!!!!!!
    var data = ctx3.getImageData(0,0,80,80); // firefox error
    //var data2 = ctx2.putImageData(data,0,0);
    console.log(data);
    let tensor = tf.fromPixels(data,3)
                .resizeNearestNeighbor([16,16]).toFloat(); 
    console.log(tensor);         
    let offset = tf.scalar(255);
    let dat= tensor.div(offset).expandDims();

    const CLASSES = {1:'AREA',2:'SPOT',3:'LINE',4:'NONE'};
    const path = 'https://cab-tokoron.github.io/model.json';
    console.log('read');
    //Access-Control-Allow-Origin:
    async function loadPretrainedModel(){ 
        const model = await tf.loadModel(path);
        console.log(model);
        let pred = model.predict(tensor).data();
        let results = Array.from(pred);
        console.log(results);
    }
    
    tf.loadModel(path).then(model => {
        console.log(model);
        let pred = model.predict(tensor,{batchsize:1}).data();
        let results = Array.from(pred);
        console.log(results);
    });
    
    
    loadPretrainedModel();
    

    
