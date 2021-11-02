var formSubmitButton = document.querySelector("form > button");
formSubmitButton.addEventListener("click", function(){
  goConvert();
});


var conversionResult = document.querySelector(".conversion-result");
var codeForm = document.getElementById("codeForm");  //form 객체


function goConvert(){
  var target = codeForm.elements[0].value;

  // 만약 타겟이 HEX TYPE이라면

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
