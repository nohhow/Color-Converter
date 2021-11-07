var formSubmitButton = document.querySelector("form > button");
formSubmitButton.addEventListener("click", function(){
  goConvert();
});


var conversionResult = document.querySelector(".conversion-result");
var codeForm = document.getElementById("codeForm");  //form 객체


function goConvert(){
  var target = codeForm.elements[0].value;

  // 만약 타겟이 HEX TYPE이라면
  if(target.substr(0,1) == "#"){
    // hex 코드에서 #제거
    var hex = target.trim().replace( "#", "" );

    /* rgb로 각각 분리해서 배열에 담기. */
    var rgb = ( 3 === hex.length ) ?
    hex.match( /[a-f\d]/gi ) : hex.match( /[a-f\d]{2}/gi );

    // Input이 #FFFFFF 일 때, 현재 까지 rgb = [FF,FF,FF] 이 상태..   forEach 통해서 loop
    if(rgb != null){
      rgb.forEach(function (str, index, array){
          /* rgb 각각의 헥사값이 한자리일 경우, 두자리로 변경하기. */
          if ( str.length == 1 ) str = str + str;

          /* 10진수로 변환하기. */
          array[ index ] = parseInt( str, 16 );
      });
    }else{
      alert('값을 확인하세요.');
      return;
    }

    // 결과 표시
    conversionResult.innerText="rgb(" + rgb.join(", ") + ")";
  }
  else{
    /*
    ** 컬러값과 쉼표만 남기고 삭제하기.
    ** 쉼표(,)를 기준으로 분리해서, 배열에 담기.
    */
    var rgb = target.replace( /[^%,.\d]/g, "" ).split( "," );

    rgb.forEach(function (str, x, arr){

        /* 컬러값이 "%"일 경우, 변환하기. */
        if ( str.indexOf( "%" ) > -1 ) str = Math.round( parseFloat(str) * 2.55 );

        /* 16진수 문자로 변환하기. */
        str = parseInt( str, 10 ).toString( 16 );
        if ( str.length === 1 ) str = "0" + str;

        arr[ x ] = str;
    });

    conversionResult.innerText= "#" + rgb.join( "" );

  }




}
