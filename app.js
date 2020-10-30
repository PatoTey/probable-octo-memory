const moduloEncriptador = (() => {
   
    const alfBase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];
    let textoCifrado, textoClaro, secuencia,k1,k2;
    const btnDescifrado = document.getElementById("btnDescifrado");
    const btnCifrado = document.getElementById("btnCifrado");

    const limpiarEncriptador = () =>{
        textoCifrado = "";
        textoClaro = "";
        secuencia = 0;
        k1 = 0;
        k2 = 0;
    }

    const obtenerEntradas = () => {
        k1 = document.getElementById('inputClave1').value;        
        k2 = document.getElementById('inputClave2').value;
        secuencia = document.getElementById('inputSecuencia').value; 
        if( k1 == "" || secuencia == ""|| k2 == ""){
            alert("Rellene los campos K1, K2 y secuencia");
            return false;
        }
        else{  
            textoCifrado = document.getElementById('inputTextoCifrado');
            textoClaro = document.getElementById('inputTextoClaro');
            return true;
        }
        
    }

    const descifrarTexto = (str) => {
        let textoTempDes = str.toLowerCase()
        let textoResult = ""
        let secIndexDes = 0;
        for(let i=0; i < textoTempDes.length; i++) {
            textoResult += encontrarCaracter(textoTempDes[i],secuencia[secIndexDes] === '1'? k1:k2, false)
            secIndexDes++;
            if(secIndexDes=== secuencia.length){
                secIndexDes = 0;
            }
        }
        return textoResult.split("x").join(" ").toUpperCase()
    }

    const cifrarTexto = (str) => {
        let textoTemp = str.toLowerCase().split(" ").join("x");
        let textoRes = ""
        let secIndex = 0;
        for(let i = 0; i < textoTemp.length; i++){
            textoRes += encontrarCaracter(textoTemp[i],secuencia[secIndex] === '1'? k1:k2, true);
            secIndex++;
            if(secIndex === secuencia.length){
                secIndex = 0;
            }
        }
        return textoRes.toUpperCase()
    }

    const encontrarCaracter = (letra,clave, accion) => {
        let largoAlf = alfBase.length;
        letraIndex=0;
        if(accion){
            letraIndex = parseInt(alfBase.indexOf(letra)) + parseInt(clave);
            if(letraIndex > largoAlf){
                letraIndex = (largoAlf - letraIndex)*(-1)
            }
        }
        else{
            letraIndex = parseInt(alfBase.indexOf(letra)) - parseInt(clave)
            if(letraIndex < 0){
                letraIndex = (largoAlf + letraIndex)
            }
        }
        return(alfBase[letraIndex]);
    }

    btnDescifrado.addEventListener('click', () => {
        if(obtenerEntradas()){
            if(textoCifrado.value != ""){
                textoClaro.value = descifrarTexto(textoCifrado.value);
            }
            else{
                alert("Ingrese el texto cifrado a Descifrar");
            }
        }
        
    })

    btnCifrado.addEventListener('click', () => { 
        if(obtenerEntradas()){        
            if(textoClaro.value != ""){
                textoCifrado.value = cifrarTexto(textoClaro.value);
            }
            else{
                alert("Ingrese el texto claro a cifrar");
            }
        }      
    })

    return{
        nuevoEncriptador : limpiarEncriptador,
    }
})();