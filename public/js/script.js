document.querySelector(".add").disabled = document.querySelector(".formInput").value ? false : true
document.querySelector(".formInput").onkeyup = function(){
	document.querySelector(".add").disabled = this.value ? false : true
}